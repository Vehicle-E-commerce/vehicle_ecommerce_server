import { Request, Response } from "express";
import { ISessionRequest } from "../interfaces/session";
import sessionService from "../services/session/session.service";

const sessionController = async (req: Request, res: Response) => {
  const { email, password }: ISessionRequest = req.body;

  const token = await sessionService({ email, password });

  return res.json({ token });
};

export default sessionController;