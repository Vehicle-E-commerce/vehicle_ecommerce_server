import { Express } from "express";
import { announcementRoutes } from "./announcements.routes";
import { HelloRoutes } from "./helloWord.routes";
import sessionRoutes from "./session.routes";

export const appRoutes = (app: Express) => {
    app.use("/", HelloRoutes());
    app.use("/announcement", announcementRoutes);
    app.use("/login", sessionRoutes);
};