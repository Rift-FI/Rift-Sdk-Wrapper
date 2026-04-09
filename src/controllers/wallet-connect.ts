import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";

export const pair = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.walletConnect.pair(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getRequests = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.walletConnect.getRequests();
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const approveRequest = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.walletConnect.approveRequest(req.params.id);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const rejectRequest = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.walletConnect.rejectRequest(req.params.id);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.walletConnect.getSessions();
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const disconnectSession = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.walletConnect.disconnectSession(req.params.topic);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
