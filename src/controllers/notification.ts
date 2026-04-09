import { Request, Response } from "express";
import { sanitizeError } from "../utils/error";
import {
  NotificationSubscriptionRequest,
  NotificationTestRequest,
  NotificationSendRequest,
} from "../types";

export const registerSubscription = async (
  req: Request<{}, {}, NotificationSubscriptionRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.notifications.registerSubscription(
      req.body
    );
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const unsubscribe = async (
  req: Request<{}, {}, { subscriberId: string }>,
  res: Response
) => {
  try {
    const { subscriberId } = req.body;
    const response = await req.rift!.notifications.unsubscribe(subscriberId);
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const getUserSubscriptions = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.notifications.getUserSubscriptions();
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const sendTestNotification = async (
  req: Request<{}, {}, NotificationTestRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.notifications.sendTestNotification(
      req.body
    );
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const sendToAllUserSubscribers = async (
  req: Request<{}, {}, NotificationSendRequest>,
  res: Response
) => {
  try {
    const response = await req.rift!.notifications.sendToAllUserSubscribers(
      req.body
    );
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};

export const deleteAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const response = await req.rift!.notifications.deleteAllSubscriptions();
    res.status(200).json(response);
  } catch (error: any) {
    { const _s = sanitizeError(error); res.status(_s.status || 400).json({ error: _s.error }); };
  }
};
