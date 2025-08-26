import { Request, Response } from "express";
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
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
  }
};
