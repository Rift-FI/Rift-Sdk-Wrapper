import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";

export const getAllDeposits = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.deposits.getAllDeposits();
    res.status(200).json(response);
  } catch (error: any) {
    const _s = sanitizeError(error);
    res.status(_s.status || 400).json({ error: _s.error });
  }
};

export const getDepositStats = async (req: Request, res: Response) => {
  try {
    // The `as any` cast that used to live here was a leftover from before
    // the SDK exposed getDepositStats. The method is now part of the public
    // DepositsService surface, so the cast is no longer needed.
    const response = await req.rift!.deposits.getDepositStats();
    res.status(200).json(response);
  } catch (error: any) {
    const _s = sanitizeError(error);
    res.status(_s.status || 400).json({ error: _s.error });
  }
};
