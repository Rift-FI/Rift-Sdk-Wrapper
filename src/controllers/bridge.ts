import { Request, Response } from "express";

export const getRoutes = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.bridge.getRoutes();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuote = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.bridge.getQuote(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const execute = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.bridge.execute(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
