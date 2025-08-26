import { Request, Response } from "express";
import {
  PreviewExchangeRateRequest,
  CreateOfframpOrderRequest,
  PollOfframpOrderRequest,
  SendPaymentLinkRequest,
  PayRequest,
  OfframpCurrency,
} from "../types";

export const previewExchangeRate = async (
  req: Request<{}, {}, PreviewExchangeRateRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.offramp.previewExchangeRate(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getSupportedInstitutions = async (
  req: Request<{ currency: OfframpCurrency }>,
  res: Response
) => {
  try {
    const { currency } = req.params;
    const response = await req.rift!.offramp.getSupportedInstitutions(currency);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const sendPaymentLink = async (
  req: Request<{}, {}, SendPaymentLinkRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.offramp.sendPaymentLink(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const pay = async (req: Request<{}, {}, PayRequest>, res: Response) => {
  try {
    const response = await req.rift!.offramp.pay(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createOrder = async (
  req: Request<{}, {}, CreateOfframpOrderRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.offramp.createOrder(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getWithdrawalFee = async (
  req: Request<{}, {}, { amount: number }>,
  res: Response
) => {
  try {
    const { amount } = req.body;
    const response = await req.rift!.offramp.getWithdrawalFee(amount);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const pollOrderStatus = async (
  req: Request<{}, {}, {}, PollOfframpOrderRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.offramp.pollOrderStatus(req.query);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.offramp.getOrders();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
