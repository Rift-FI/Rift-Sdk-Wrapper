import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";
import {
  CreateInvoiceRequest,
  GetInvoicesRequest,
  GetMerchantStatusRequest,
} from "../types";

export const createInvoice = async (
  req: Request<{}, {}, CreateInvoiceRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.merchant.createInvoice(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getInvoices = async (
  req: Request<{}, {}, {}, GetInvoicesRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.merchant.getInvoices(req.query);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getMerchantStatus = async (
  req: Request<{}, {}, {}, GetMerchantStatusRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.merchant.getMerchantStatus(req.query);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
