import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";
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
  GoogleLoginRequest,
  AppleLoginRequest,
} from "../types";

export const signup = async (
  req: Request<{}, {}, SignupRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.signup(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const loginWithGoogle = async (
  req: Request<{}, {}, GoogleLoginRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.loginWithGoogle(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const loginWithApple = async (
  req: Request<{}, {}, AppleLoginRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.auth.loginWithApple(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getRecoveryOptions = async (req: Request, res: Response) => {
  try {
    const { externalId } = req.params;
    const response = await req.rift!.auth.getRecoveryOptions(externalId);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
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
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
