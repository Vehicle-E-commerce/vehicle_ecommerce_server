import { Router } from "express";
import userSessionController from "../controllers/session.controller";

export const sessionRoutes = Router();

sessionRoutes.post("/", userSessionController);

export default sessionRoutes;