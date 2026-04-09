import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";

export const getAllDeposits = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.deposits.getAllDeposits();
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getDepositStats = async (req: Request, res: Response) => {
  try {
    const response = await (req.rift!.deposits as any).getDepositStats();
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

