import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";

export const suspendUser = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.userManagement.suspendUser(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const unsuspendUser = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.userManagement.unsuspendUser(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getSuspendedUsers = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.userManagement.getSuspendedUsers(req.query as any);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getUserStatus = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.userManagement.getUserStatus(req.query as any);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
