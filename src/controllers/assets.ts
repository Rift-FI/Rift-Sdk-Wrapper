import { Request, Response } from "express";

export const getSupportedChains = async (req: Request, res: Response) => {
  try {
    const active = req.query.active === "true";
    const response = await req.rift!.assets.getSupportedChains(active);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllTokens = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.assets.getAllTokens();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserTokens = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.assets.getUserTokens();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
  }
};
