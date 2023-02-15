import "express-async-errors";
import express from "express";
import "reflect-metadata";

import { appRoutes } from "./routes";
import handleErrorMidleware from "./middlewares/handleError.midleware";


const app = express()
app.use(express.json())

appRoutes(app);
app.use(handleErrorMidleware)

export default app;