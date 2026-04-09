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

  return { error: message };
}
