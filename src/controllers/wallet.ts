import { Request, Response } from "express";
import { TokenBalanceRequest, ChainBalanceRequest } from "../types";

export const getTokenBalance = async (
  req: Request<{}, {}, {}, TokenBalanceRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.wallet.getTokenBalance(req.query);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
  }
};
