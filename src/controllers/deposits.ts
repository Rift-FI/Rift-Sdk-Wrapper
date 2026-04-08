import { Request, Response } from "express";

export const getAllDeposits = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.deposits.getAllDeposits();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getDepositStats = async (req: Request, res: Response) => {
  try {
    const response = await (req.rift!.deposits as any).getDepositStats();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

