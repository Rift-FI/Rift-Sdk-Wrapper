import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";
import { TokenBalanceRequest, ChainBalanceRequest } from "../types";

export const getTokenBalance = async (
  req: Request<{}, {}, {}, TokenBalanceRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.wallet.getTokenBalance(req.query);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getChainBalance = async (
  req: Request<{}, {}, {}, ChainBalanceRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.wallet.getChainBalance(req.query);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
