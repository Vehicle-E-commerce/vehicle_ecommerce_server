import { Express } from "express";
import { HelloRoutes } from "./helloWord.routes";

export const appRoutes = (app: Express) => {
    app.use("/", HelloRoutes());
};