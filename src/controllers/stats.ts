import { Request, Response } from "express";

export const getVolume = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.stats.getVolume();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.stats.getUsers();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTvl = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.stats.getTvl();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
