import { Router } from "express";
import { updateAddressController } from "../controllers/address.controller";

import { authTokenMiddleware } from "../middlewares/authToken.middleware";

export const addressRoutes = Router();



addressRoutes.patch("/", authTokenMiddleware, updateAddressController)