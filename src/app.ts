import "express-async-errors";
import express from "express";
import cors from "cors";
import "reflect-metadata";
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../swagger.json"

import { appRoutes } from "./routes";
import handleErrorMidleware from "./middlewares/handleError.midleware";


const app = express()
app.use(express.json())

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", 'GET, POST, PATCH, DELETE')

  next();
})

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

appRoutes(app);
app.use(handleErrorMidleware)

export default app;