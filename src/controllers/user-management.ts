import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";
import type {
  SuspendUserRequest,
  UnsuspendUserRequest,
  GetUserStatusRequest,
} from "../types";

// User management (suspend / unsuspend / status / lookup / suspended list)
// is authorised by the PROJECT OWNER's bearer token plus the project's API
// key (backend: requireProjectAdmin). The old `projectOwnerEmail` /
// `projectOwnerPhone` "proof" is no longer accepted, so it is stripped and
// never forwarded.
//
// The published SDK's UserManagementService still sends these calls
// WITHOUT the bearer token (publicRequest), so we go through the SDK's
// HTTP client directly and attach the caller's Authorization header.
// That keeps the same base URL, API key, timeout and retries: 0 settings
// as every other call, and works the same once the SDK is republished.

const OWNER_TOKEN_REQUIRED =
  "Unauthorized: user management requires the project owner's token. Log in as the project owner and send 'Authorization: Bearer <token>'.";

function ownerAuthHeader(req: Request): string | null {
  const raw = req.headers["authorization"];
  const header = Array.isArray(raw) ? raw[0] : raw;
  if (!header) return null;
  const match = /^Bearer\s+(\S+)\s*$/i.exec(header);
  return match ? `Bearer ${match[1]}` : null;
}

function stripOwnerFields<T extends Record<string, any>>(input: T | undefined) {
  const { projectOwnerEmail: _e, projectOwnerPhone: _p, ...rest } = (input || {}) as Record<string, any>;
  return rest;
}

function definedOnly(input: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(input)) {
    if (typeof v === "string" && v !== "") out[k] = v;
  }
  return out;
}

type OwnerCall = {
  method: "GET" | "POST";
  url: string;
  data?: Record<string, any>;
  params?: Record<string, string>;
};

async function ownerRequest(req: Request, res: Response, call: OwnerCall) {
  const authorization = ownerAuthHeader(req);
  if (!authorization) {
    return res.status(401).json({ error: OWNER_TOKEN_REQUIRED });
  }
  try {
    const httpClient = (req.rift as any)?.httpClient;
    if (!httpClient || typeof httpClient.request !== "function") {
      return res.status(500).json({ error: "Rift SDK not initialized." });
    }
    const response = await httpClient.request({
      ...call,
      headers: { Authorization: authorization },
    });
    return res.status(200).json(response);
  } catch (error: any) {
    const _s = sanitizeError(error);
    return res.status(_s.status || 400).json({ error: _s.error });
  }
}

export const suspendUser = async (
  req: Request<{}, {}, SuspendUserRequest>,
  res: Response
) =>
  ownerRequest(req as Request, res, {
    method: "POST",
    url: "/v1/users/suspend",
    data: stripOwnerFields(req.body),
  });

export const unsuspendUser = async (
  req: Request<{}, {}, UnsuspendUserRequest>,
  res: Response
) =>
  ownerRequest(req as Request, res, {
    method: "POST",
    url: "/v1/users/unsuspend",
    data: stripOwnerFields(req.body),
  });

// `projectOwnerEmail` / `projectOwnerPhone` query params are ignored: the
// listing is scoped by the owner's token + API key.
export const getSuspendedUsers = async (req: Request, res: Response) =>
  ownerRequest(req, res, { method: "GET", url: "/v1/users/suspended" });

export const getUserStatus = async (req: Request, res: Response) => {
  const { phoneNumber, email, externalId, userId } = req.query as GetUserStatusRequest;
  return ownerRequest(req, res, {
    method: "GET",
    url: "/v1/users/lookup",
    params: definedOnly({ phoneNumber, email, externalId, userId }),
  });
};
