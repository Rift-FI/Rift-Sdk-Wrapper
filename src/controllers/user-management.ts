import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";
import type {
  SuspendUserRequest,
  UnsuspendUserRequest,
  GetSuspendedUsersRequest,
  GetUserStatusRequest,
} from "../types";

export const suspendUser = async (
  req: Request<{}, {}, SuspendUserRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.userManagement.suspendUser(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    const _s = sanitizeError(error);
    res.status(_s.status || 400).json({ error: _s.error });
  }
};

export const unsuspendUser = async (
  req: Request<{}, {}, UnsuspendUserRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.userManagement.unsuspendUser(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    const _s = sanitizeError(error);
    res.status(_s.status || 400).json({ error: _s.error });
  }
};

// Express 5's typing for req.query (ParsedQs) is too loose to satisfy
// the SDK's `GetSuspendedUsersRequest` shape via a single Request<>
// generic, so we destructure inside the handler with a narrow cast
// rather than blanket-casting req.query to `any`. This keeps the
// downstream SDK call site fully typed.
export const getSuspendedUsers = async (req: Request, res: Response) => {
  try {
    const { projectOwnerPhone, projectOwnerEmail } = req.query as {
      projectOwnerPhone?: string;
      projectOwnerEmail?: string;
    };
    const params: GetSuspendedUsersRequest = {
      projectOwnerPhone,
      projectOwnerEmail,
    };
    const response = await req.rift!.userManagement.getSuspendedUsers(params);
    res.status(200).json(response);
  } catch (error: any) {
    const _s = sanitizeError(error);
    res.status(_s.status || 400).json({ error: _s.error });
  }
};

export const getUserStatus = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, email, externalId, userId } = req.query as {
      phoneNumber?: string;
      email?: string;
      externalId?: string;
      userId?: string;
    };
    const params: GetUserStatusRequest = {
      phoneNumber,
      email,
      externalId,
      userId,
    };
    const response = await req.rift!.userManagement.getUserStatus(params);
    res.status(200).json(response);
  } catch (error: any) {
    const _s = sanitizeError(error);
    res.status(_s.status || 400).json({ error: _s.error });
  }
};
