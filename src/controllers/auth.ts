import { Request, Response } from "express";
import {
  LoginRequest,
  SignupRequest,
  OtpRequest,
  OtpVerifyRequest,
  DeleteUserRequest,
  CreateRecoveryRequest,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
  UpdateRecoveryRequest,
  AddRecoveryMethodRequest,
  RemoveRecoveryMethodRequest,
  UpdateRecoveryMethodRequest,
  GetMyRecoveryMethodsRequest,
  DeleteAllRecoveryMethodsRequest,
  UpdateUserRequest,
} from "../types";

export const signup = async (
  req: Request<{}, {}, SignupRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.signup(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.login(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (
  req: Request<{}, {}, UpdateUserRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.updateUser(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const sendOtp = async (
  req: Request<{}, {}, OtpRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.sendOtp(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyOtp = async (
  req: Request<{}, {}, OtpVerifyRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.verifyOtp(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.auth.getUser();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const deleteUser = async (
  req: Request<{}, {}, DeleteUserRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.deleteUser(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  req.rift!.auth.logout();
  res.status(200).json({ message: "Logged out successfully" });
};

export const createRecoveryMethods = async (
  req: Request<{}, {}, CreateRecoveryRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.createRecoveryMethods(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getRecoveryOptions = async (req: Request, res: Response) => {
  try {
    const { externalId } = req.params;
    const response = await req.rift!.auth.getRecoveryOptions(externalId);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const requestPasswordReset = async (
  req: Request<{}, {}, RequestPasswordResetRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.requestPasswordReset(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const resetPassword = async (
  req: Request<{}, {}, ResetPasswordRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.resetPassword(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRecoveryMethods = async (
  req: Request<{}, {}, UpdateRecoveryRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.updateRecoveryMethods(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const addRecoveryMethod = async (
  req: Request<{}, {}, AddRecoveryMethodRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.addRecoveryMethod(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeRecoveryMethod = async (
  req: Request<{}, {}, RemoveRecoveryMethodRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.removeRecoveryMethod(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRecoveryMethod = async (
  req: Request<{}, {}, UpdateRecoveryMethodRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.updateRecoveryMethod(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMyRecoveryMethods = async (
  req: Request<{}, {}, GetMyRecoveryMethodsRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.getMyRecoveryMethods(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAllRecoveryMethods = async (
  req: Request<{}, {}, DeleteAllRecoveryMethodsRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.deleteAllRecoveryMethods(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
