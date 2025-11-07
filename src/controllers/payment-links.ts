import { Request, Response } from "express";
import {
  CreatePaymentRequestInput,
  SendSpecificPaymentRequest,
  SendOpenPaymentRequest,
  ClaimPaymentRequest,
  GetPaymentRequestsInput,
  GetSendLinksInput,
  RegisterRedirectUrlRequest,
  GetRedirectLinksRequest,
} from "../types";

export const requestPayment = async (
  req: Request<{}, {}, CreatePaymentRequestInput>,
  res: Response
) => {
  try {
    // Type assertion for new SDK services not yet in published version
    const response = await (req.rift as any).paymentLinks.requestPayment(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const payPaymentRequest = async (
  req: Request<{}, {}, {}, { nonce: string }>,
  res: Response
) => {
  try {
    const { nonce } = req.query;
    const response = await (req.rift as any).paymentLinks.payPaymentRequest(nonce);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createSpecificSendLink = async (
  req: Request<{}, {}, SendSpecificPaymentRequest>,
  res: Response
) => {
  try {
    const response = await (req.rift as any).paymentLinks.createSpecificSendLink(
      req.body
    );
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createOpenSendLink = async (
  req: Request<{}, {}, SendOpenPaymentRequest>,
  res: Response
) => {
  try {
    const response = await (req.rift as any).paymentLinks.createOpenSendLink(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const claimSpecificSendLink = async (
  req: Request<{}, {}, ClaimPaymentRequest>,
  res: Response
) => {
  try {
    const response = await (req.rift as any).paymentLinks.claimSpecificSendLink(
      req.body
    );
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const claimOpenSendLink = async (
  req: Request<{}, {}, ClaimPaymentRequest>,
  res: Response
) => {
  try {
    const response = await (req.rift as any).paymentLinks.claimOpenSendLink(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listPaymentRequests = async (
  req: Request<{}, {}, {}, GetPaymentRequestsInput>,
  res: Response
) => {
  try {
    const response = await (req.rift as any).paymentLinks.listPaymentRequests(
      req.query
    );
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listSendLinks = async (
  req: Request<{}, {}, {}, GetSendLinksInput>,
  res: Response
) => {
  try {
    const response = await (req.rift as any).paymentLinks.listSendLinks(req.query);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelPaymentRequest = async (
  req: Request<{ nonce: string }>,
  res: Response
) => {
  try {
    const { nonce } = req.params;
    const response = await (req.rift as any).paymentLinks.cancelPaymentRequest(nonce);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelSendLink = async (
  req: Request<{ urlId: string }>,
  res: Response
) => {
  try {
    const { urlId } = req.params;
    const response = await (req.rift as any).paymentLinks.cancelSendLink(urlId);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const registerRequestLinkRedirectUrl = async (
  req: Request<{}, {}, RegisterRedirectUrlRequest>,
  res: Response
) => {
  try {
    const response =
      await req.rift!.paymentLinks.registerRequestLinkRedirectUrl(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const registerSendLinkRedirectUrl = async (
  req: Request<{}, {}, RegisterRedirectUrlRequest>,
  res: Response
) => {
  try {
    const response = await (req.rift as any).paymentLinks.registerSendLinkRedirectUrl(
      req.body
    );
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await (req.rift as any).paymentLinks.getAllUsers();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getRedirectLinks = async (
  req: Request<{}, {}, GetRedirectLinksRequest>,
  res: Response
) => {
  try {
    const response = await (req.rift as any).paymentLinks.getRedirectLinks(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

