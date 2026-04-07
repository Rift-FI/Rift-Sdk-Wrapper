import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.project.create(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.project.getAll(req.query as any);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMyProjects = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.project.getMyProjects(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.project.getById(req.params.id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.project.getStats(req.params.id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const regenerateKey = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.project.regenerateKey(req.params.id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.project.delete(req.params.id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const addOrigin = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.project.addOrigin(req.params.projectId, req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePaymentWidget = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.project.updatePaymentWidget(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
