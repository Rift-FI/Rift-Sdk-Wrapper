import { Request, Response } from "express";

export const getBalance = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.referralFees.getBalance();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getEntries = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.referralFees.getEntries();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const claim = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.referralFees.claim();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getClaims = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.referralFees.getClaims();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getReferrals = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.referralFees.getReferrals(req.query as any);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
