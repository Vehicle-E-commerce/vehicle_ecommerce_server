import { Router } from "express";
import { sessionController } from "../controllers/session.controller";

export const sessionRoutes = Router();

sessionRoutes.post("/", sessionController);

export default sessionRoutes;