import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";
import { SwapRequest } from "../types";
import { sendResult } from "../utils/passthrough";

export const swap = async (
  req: Request<{}, {}, SwapRequest>,
  res: Response
) => {
  try {
    // Deprecated upstream (/v1/defi/swap is no longer served); kept as a
    // passthrough so callers get the backend's answer, 202 approval included.
    const response = await req.rift!.defi.swap(req.body);
    sendResult(res, response);
  } catch (error: any) {
    const _s = sanitizeError(error);
    res.status(_s.status || 400).json({ error: _s.error });
  }
};
