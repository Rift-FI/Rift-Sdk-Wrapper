import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
