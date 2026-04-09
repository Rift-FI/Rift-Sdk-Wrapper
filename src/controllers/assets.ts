import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";

export const getSupportedChains = async (req: Request, res: Response) => {
  try {
    const active = req.query.active === "true";
    const response = await req.rift!.assets.getSupportedChains(active);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getAllTokens = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.assets.getAllTokens();
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getUserTokens = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.assets.getUserTokens();
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getTokensByChainId = async (
  req: Request<{ chainId: string }>,
  res: Response
) => {
  try {
    const { chainId } = req.params;
    const response = await req.rift!.assets.getTokensByChainId(chainId);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getTokenById = async (
  req: Request<{ tokenId: string }>,
  res: Response
) => {
  try {
    const { tokenId } = req.params;
    const response = await req.rift!.assets.getTokenById(tokenId);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getChainById = async (
  req: Request<{ chainId: string }>,
  res: Response
) => {
  try {
    const { chainId } = req.params;
    const response = await req.rift!.assets.getChainById(chainId);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
