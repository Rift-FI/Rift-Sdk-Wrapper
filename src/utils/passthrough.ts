import { Request, Response } from "express";
import { sanitizeError } from "./error";

// Passkey wallets: fund-moving calls made through the wrapper never carry a
// passkey, so the backend answers HTTP 202
// { status: "APPROVAL_REQUIRED", approvalId, approvalUrl, expiresAt, summary }.
// That body must reach the client unchanged and with its 202, so the client
// (or agent) can hand approvalUrl to the user.
export function isApprovalRequired(body: any): boolean {
  return (
    !!body &&
    typeof body === "object" &&
    body.status === "APPROVAL_REQUIRED" &&
    typeof body.approvalId === "string"
  );
}

// Send an SDK result: 202 + body as-is for an approval request, else
// `okStatus` (the route's normal success status).
export function sendResult(res: Response, body: any, okStatus = 200) {
  if (isApprovalRequired(body)) return res.status(202).json(body);
  return res.status(okStatus).json(body);
}

export function sendError(res: Response, error: any) {
  const s = sanitizeError(error);
  res.status(s.status || 400).json({ error: s.error });
}

const UPSTREAM_TIMEOUT_MS = 120_000;

// Base URL of the Rift backend. RIFT_BACKEND_URL overrides the SDK's
// production default (sandbox, local stacks, tests).
export function backendBaseUrl(req: Request): string {
  const fromEnv = process.env.RIFT_BACKEND_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return String(req.riftV3!.getBaseUrl()).replace(/\/$/, "");
}

// Forward one request to the backend and relay its status + JSON body
// unchanged (202 approval requests, 4xx codes such as
// PASSKEY_SETUP_REQUIRED / LAST_PASSKEY / INVALID_PASSKEY_SIGNATURE, 410s).
//
// Exactly one fetch: never retried. A replay after a silently successful
// submit / approve could duplicate a payment or burn a single-use ticket.
// Used for the passkey-wallet routes the pinned SDKs don't know yet.
export function passthrough(
  method: "GET" | "POST" | "DELETE",
  path: (req: Request<any>) => string,
  opts: { body?: boolean } = {}
) {
  return async (req: Request<any>, res: Response) => {
    const url = new URL(backendBaseUrl(req) + path(req));
    for (const [k, v] of Object.entries(req.query || {})) {
      if (typeof v === "string" && v !== "") url.searchParams.set(k, v);
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-API-Key": String(req.headers["x-api-key"] || ""),
    };
    if (typeof req.headers["authorization"] === "string") {
      headers["Authorization"] = req.headers["authorization"];
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
    const init: RequestInit = { method, headers, signal: controller.signal };
    const sendBody = opts.body ?? method === "POST";
    if (sendBody && req.body && Object.keys(req.body).length > 0) {
      init.body = JSON.stringify(req.body);
    }

    let upstream: globalThis.Response;
    try {
      upstream = await fetch(url.toString(), init);
    } catch (e: any) {
      clearTimeout(timer);
      if (e?.name === "AbortError") {
        return res.status(504).json({
          error:
            "Upstream timeout. The operation may still have completed: check its status before retrying.",
        });
      }
      return res.status(502).json({ error: "Rift backend unreachable." });
    }
    clearTimeout(timer);

    const contentType = upstream.headers.get("content-type") || "";
    const text = await upstream.text();
    if (contentType.includes("application/json")) {
      try {
        return res.status(upstream.status).json(JSON.parse(text));
      } catch {
        // fall through to the sanitised error below
      }
    }
    if (upstream.status === 204) return res.status(204).end();
    if (upstream.ok) return res.status(upstream.status).json({ data: text });
    const s = sanitizeError({ message: text || `HTTP ${upstream.status}` });
    return res.status(upstream.status).json({ error: s.error });
  };
}
