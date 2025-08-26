import { Request, Response } from "express";
import {
  TransactionRequest,
  TransactionHistoryRequest,
  TransactionFeeRequest,
} from "../types";

export const send = async (
  req: Request<{}, {}, TransactionRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.transactions.send(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getHistory = async (
  req: Request<{}, {}, {}, TransactionHistoryRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.transactions.getHistory(req.query);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getFee = async (
  req: Request<{}, {}, {}, TransactionFeeRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.transactions.getFee(req.query);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
