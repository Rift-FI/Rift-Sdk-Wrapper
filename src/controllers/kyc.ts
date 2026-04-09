import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";

export const getToken = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.kyc.getToken(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const checkUserExists = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.kyc.checkUserExists(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getStatus = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.kyc.getStatus(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const verifyAndSendOtp = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.kyc.verifyAndSendOtp(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.kyc.verify(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const isVerified = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.kyc.isVerified();
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getJobStatus = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.kyc.getJobStatus(req.params.jobId);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
