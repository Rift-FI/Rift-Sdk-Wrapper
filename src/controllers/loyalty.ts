import { Request, Response } from "express";

export const getStats = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.loyalty.getStats();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.loyalty.getHistory(req.query as any);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.loyalty.getLeaderboard(req.query as any);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMetrics = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.loyalty.getMetrics();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPointValue = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.loyalty.getPointValue();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const redeem = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.loyalty.redeem(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getRedemptions = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.loyalty.getRedemptions();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getConfig = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.loyalty.getConfig();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
