import { Request, Response } from "express";

export const getAllDeposits = async (req: Request, res: Response) => {
  try {
    // Type assertion for new SDK services not yet in published version
    const response = await (req.rift as any).deposits.getAllDeposits();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

