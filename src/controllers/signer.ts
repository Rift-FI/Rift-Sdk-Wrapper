import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";
import { sendResult } from "../utils/passthrough";
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

// Raw EOA signing is gone (passkey-owned Safe wallets). The backend
// answers 410 { error: "EOA_SIGNING_REMOVED" }; sanitizeError passes the 410
// through.
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
    sendResult(res, response);
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
    sendResult(res, response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
