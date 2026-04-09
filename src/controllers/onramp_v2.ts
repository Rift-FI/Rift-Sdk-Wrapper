import { Request, Response } from "express";
import { BuyRequest } from "../types";
import { sanitizeError } from "../utils/error";

export const buy = async (req: Request<{}, {}, BuyRequest>, res: Response) => {
  try {
    const response = await req.rift!.onrampV2.buy(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    const sanitized = sanitizeError(error);
    res.status(sanitized.status || 400).json({ error: sanitized.error });
  }
};

export const getOnrampStatus = async (
  req: Request<{}, {}, { transactionCode: string }>,
  res: Response
) => {
  try {
    const { transactionCode } = req.body;
    const response = await req.rift!.onrampV2.getOnrampStatus(transactionCode);
    res.status(200).json(response);
  } catch (error: any) {
    const sanitized = sanitizeError(error);
    res.status(sanitized.status || 400).json({ error: sanitized.error });
  }
};

export const getOnrampOrders = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const response = await req.rift!.onrampV2.getOnrampOrders(userId);
    res.status(200).json(response);
  } catch (error: any) {
    const sanitized = sanitizeError(error);
    res.status(sanitized.status || 400).json({ error: sanitized.error });
  }
};
