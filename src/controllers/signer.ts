import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";
import {
  GetWalletInstanceRequest,
  SignTransactionRequest,
  SendTransactionRequest,
  SignMessageRequest,
} from "../types";

export const getWalletInstance = async (
  req: Request<{}, {}, GetWalletInstanceRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.signer.getWalletInstance(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const signTransaction = async (
  req: Request<{}, {}, SignTransactionRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.signer.signTransaction(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const sendTransaction = async (
  req: Request<{}, {}, SendTransactionRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.signer.sendTransaction(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const signMessage = async (
  req: Request<{}, {}, SignMessageRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.signer.signMessage(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
