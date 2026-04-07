import { Request, Response } from "express";

export const suspendUser = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.userManagement.suspendUser(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const unsuspendUser = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.userManagement.unsuspendUser(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getSuspendedUsers = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.userManagement.getSuspendedUsers(req.query as any);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserStatus = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.userManagement.getUserStatus(req.query as any);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
