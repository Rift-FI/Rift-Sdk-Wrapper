import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";

export const getRoutes = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.bridge.getRoutes();
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getQuote = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.bridge.getQuote(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const execute = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.bridge.execute(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
