// Upstream statuses that are passed through unchanged instead of being
// flattened into the controller's default (usually 400), because clients
// must react to them differently:
//   409 - e.g. PASSKEY_SETUP_REQUIRED: the user must register a passkey first.
//   410 - EOA_SIGNING_REMOVED / REPLACED_BY_PASSKEY_WALLETS: endpoint is gone.
//   429 - rate limit or OTP lockout: wait, don't resend a code immediately.
//   503 - e.g. {"error":"parent-proxy overloaded"}: back off.
const PASSTHROUGH_STATUSES = new Set([409, 410, 429, 503]);

// Sanitize error messages so HTML/garbage from upstream doesn't leak through
export function sanitizeError(error: any): { error: string; status?: number } {
  let message = error?.message || String(error);

  // Detect HTML responses (Render/Cloudflare 502 pages, etc)
  if (typeof message === "string" && (message.trim().startsWith("<") || message.includes("<!DOCTYPE"))) {
    // Try to extract a meaningful status code from the HTML title
    const titleMatch = message.match(/<title>(\d+)/i);
    const status = titleMatch ? parseInt(titleMatch[1], 10) : 502;
    return {
      error: `Upstream server error (HTTP ${status}). The Rift backend is temporarily unavailable. Please try again in a moment.`,
      status,
    };
  }

  // Truncate absurdly long error messages
  if (message.length > 500) {
    message = message.slice(0, 500) + "...";
  }

  // Backend 500s are now `{ message, requestId }` with no internal detail.
  // Keep the request id so the failure can be traced.
  if (typeof error?.requestId === "string" && !message.includes(error.requestId)) {
    message = `${message} (requestId: ${error.requestId})`;
  }

  const upstreamStatus = Number(error?.status);
  if (PASSTHROUGH_STATUSES.has(upstreamStatus)) {
    return { error: message, status: upstreamStatus };
  }

  return { error: message };
}
