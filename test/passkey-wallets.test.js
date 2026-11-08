// Passkey-wallet relay tests. Runs the built wrapper (dist/) against a fake
// Rift backend and checks that approval requests, passkey/approval routes
// and removed endpoints are relayed correctly, with exactly one upstream
// attempt per call. Run with `npm test` (builds first).
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { spawn } = require("node:child_process");
const path = require("node:path");

const APPROVAL = {
  status: "APPROVAL_REQUIRED",
  approvalId: "apr_1",
  approvalUrl: "https://app.riftfi.com/approve/apr_1",
  expiresAt: "2026-11-08T12:30:00.000Z",
  summary: { opType: "transfer", token: "USDC", amount: "10" },
};

let upstream;
let wrapper;
let upstreamPort;
let wrapperPort;
const hits = [];

function route(method, url, body) {
  const p = url.split("?")[0];
  if (method === "POST" && ["/v1/transactions", "/v1/wallet/user-operations", "/v1/wallet/signatures/message", "/v1/bridge/transfers", "/v1/offramps", "/v1/defi/swap"].includes(p)) {
    if (body && body.ticketId && body.authProof) return [200, { status: "success", transactionHash: "0xt" }];
    return [202, APPROVAL];
  }
  if (p === "/v1/wallet/signatures/transaction") return [410, { error: "EOA_SIGNING_REMOVED" }];
  if (p === "/v1/wallet-connect/requests/wc1/approve") return body && body.authProof ? [200, { success: true, echo: body }] : [202, APPROVAL];
  if (p === "/v1/wallet/status") return [200, { mode: "legacy", needsPasskeySetup: true, passkeyCount: 0, chains: [] }];
  if (p === "/v1/wallet/passkeys" && method === "GET") return [200, [{ id: "pk1" }]];
  if (p === "/v1/wallet/passkeys/pk1" && method === "DELETE") return [409, { error: "LAST_PASSKEY" }];
  if (p.startsWith("/v1/approvals")) return [200, { id: "apr_1", status: "pending", url }];
  if (p === "/v1/wallet/user-operations/submit-prepared") return [503, { error: "parent-proxy overloaded" }];
  if (p === "/v1/transactions/preview") return [200, { ticketId: "t1", hashToSign: "0x" + "ab".repeat(32) }];
  return [404, { error: "not found " + p }];
}

function listen(server) {
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server.address().port)));
}

before(async () => {
  upstream = http.createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      const body = raw ? JSON.parse(raw) : undefined;
      hits.push({ method: req.method, url: req.url, body, headers: req.headers });
      const [status, json] = route(req.method, req.url, body);
      res.writeHead(status, { "content-type": "application/json" });
      res.end(JSON.stringify(json));
    });
  });
  upstreamPort = await listen(upstream);

  const probe = http.createServer();
  wrapperPort = await listen(probe);
  await new Promise((r) => probe.close(r));

  wrapper = spawn(process.execPath, [path.join(__dirname, "..", "dist", "index.js")], {
    env: { ...process.env, PORT: String(wrapperPort), RIFT_BACKEND_URL: `http://127.0.0.1:${upstreamPort}` },
    stdio: ["ignore", "pipe", "pipe"],
  });
  await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("wrapper did not start")), 20000);
    wrapper.stdout.on("data", (d) => {
      if (String(d).includes("Server is running")) {
        clearTimeout(t);
        resolve();
      }
    });
    wrapper.on("exit", (code) => reject(new Error("wrapper exited " + code)));
  });
});

after(() => {
  if (wrapper) wrapper.kill();
  if (upstream) upstream.close();
});

async function call(method, p, body, { auth = true } = {}) {
  const headers = { "content-type": "application/json", "x-api-key": "sk_test" };
  if (auth) headers.authorization = "Bearer user-jwt";
  const res = await fetch(`http://127.0.0.1:${wrapperPort}${p}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json() };
}

function hitsFor(p) {
  return hits.filter((h) => h.url.split("?")[0] === p);
}

test("fund-moving SDK routes relay 202 APPROVAL_REQUIRED unchanged", async () => {
  const cases = [
    ["/api/v1/transaction/send", { to: "0x1", value: "10", token: "USDC", chain: "BASE" }, "/v1/transactions"],
    ["/api/v1/signer/send-transaction", { chain: "BASE", transactionData: { to: "0x1" } }, "/v1/wallet/user-operations"],
    ["/api/v1/signer/sign-message", { chain: "BASE", message: "hi" }, "/v1/wallet/signatures/message"],
    ["/api/v1/bridge/execute", { sourceChain: "BASE", destinationChain: "POLYGON", token: "USDC", amount: "1" }, "/v1/bridge/transfers"],
    ["/api/v1/offramp/pay", { token: "USDC", amount: 1, currency: "KES", chain: "BASE", recipient: "{}" }, "/v1/offramps"],
    ["/api/v1/offramp/", { token: "USDC", amount: 1, currency: "KES", chain: "BASE", recipient: "{}" }, "/v1/offramps"],
    ["/api/v1/defi/swap", { chain: "BASE", flow: "gasless", token_to_sell: "USDC", token_to_buy: "WETH", value: "1" }, "/v1/defi/swap"],
  ];
  for (const [p, body] of cases) {
    const r = await call("POST", p, body);
    assert.equal(r.status, 202, p);
    assert.deepEqual(r.body, APPROVAL, p);
  }
});

test("ticketId + authProof are forwarded and a submit returns the normal status", async () => {
  const proof = { kind: "passkey", cred_id_b64: "AQ==", client_data_json_b64: "e30=", authenticator_data_b64: "AA==", signature_b64: "MA==" };
  const r = await call("POST", "/api/v1/transaction/send", { to: "0x1", value: "1", token: "USDC", chain: "BASE", ticketId: "t1", authProof: proof });
  assert.equal(r.status, 200);
  const last = hitsFor("/v1/transactions").at(-1);
  assert.equal(last.body.ticketId, "t1");
  assert.deepEqual(last.body.authProof, proof);
});

test("WalletConnect approve: 202 without proof, body forwarded with proof", async () => {
  let r = await call("POST", "/api/v1/walletconnect/requests/wc1/approve");
  assert.equal(r.status, 202);
  assert.equal(r.body.approvalUrl, APPROVAL.approvalUrl);
  r = await call("POST", "/api/v1/walletconnect/requests/wc1/approve", { ticketId: "t", authProof: { kind: "passkey" } });
  assert.equal(r.status, 200);
  assert.deepEqual(r.body.echo, { ticketId: "t", authProof: { kind: "passkey" } });
  assert.equal(hitsFor("/v1/wallet-connect/requests/wc1/approve").at(-1).headers.authorization, "Bearer user-jwt");
});

test("sign-transaction passes the 410 EOA_SIGNING_REMOVED through", async () => {
  const r = await call("POST", "/api/v1/signer/sign-transaction", { chain: "BASE", transactionData: { to: "0x1" } });
  assert.equal(r.status, 410);
  assert.match(r.body.error, /EOA_SIGNING_REMOVED/);
});

test("migrate-to-v3 answers 410 without calling upstream", async () => {
  const before = hits.length;
  const r = await call("POST", "/api/v2/auth/migrate-to-v3", { enrolledMethods: [] });
  assert.equal(r.status, 410);
  assert.equal(r.body.error, "REPLACED_BY_PASSKEY_WALLETS");
  assert.equal(hits.length, before);
});

test("wallet status, passkeys and approvals routes relay status + body", async () => {
  let r = await call("GET", "/api/v1/wallet/status");
  assert.equal(r.status, 200);
  assert.equal(r.body.needsPasskeySetup, true);

  r = await call("GET", "/api/v1/passkeys");
  assert.deepEqual(r.body, [{ id: "pk1" }]);

  r = await call("DELETE", "/api/v1/passkeys/pk1");
  assert.equal(r.status, 409);
  assert.equal(r.body.error, "LAST_PASSKEY");

  r = await call("GET", "/api/v1/approvals?status=pending");
  assert.equal(r.status, 200);
  assert.equal(r.body.url, "/v1/approvals?status=pending");

  // GET /approvals/:id works with the API key alone
  r = await call("GET", "/api/v1/approvals/apr_1", undefined, { auth: false });
  assert.equal(r.status, 200);
  const h = hitsFor("/v1/approvals/apr_1").at(-1);
  assert.equal(h.headers["x-api-key"], "sk_test");
  assert.equal(h.headers.authorization, undefined);

  // the rest need the user's JWT
  r = await call("POST", "/api/v1/approvals/apr_1/approve", { ticketId: "t" }, { auth: false });
  assert.equal(r.status, 401);
});

test("two-phase routes: preview relays, submit is attempted exactly once on 503", async () => {
  let r = await call("POST", "/api/v1/transaction/preview", { token: "USDC", chain: "BASE", recipient: "0x1", amount: "1" });
  assert.equal(r.status, 200);
  assert.equal(r.body.ticketId, "t1");

  const before = hitsFor("/v1/wallet/user-operations/submit-prepared").length;
  r = await call("POST", "/api/v1/signer/submit-prepared", { ticketId: "t1", authProof: { kind: "passkey" } });
  assert.equal(r.status, 503);
  assert.equal(hitsFor("/v1/wallet/user-operations/submit-prepared").length - before, 1);
});
