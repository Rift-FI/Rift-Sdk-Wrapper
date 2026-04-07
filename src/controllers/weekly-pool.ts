import { Request, Response } from "express";

export const getCurrent = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.weeklyPool.getCurrent();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.weeklyPool.getHistory(req.query as any);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getReferralInfo = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.weeklyPool.getReferralInfo();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
