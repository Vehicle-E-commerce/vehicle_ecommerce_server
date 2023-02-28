import { Express } from "express";
import { announcementRoutes } from "./announcements.routes";
import { HelloRoutes } from "./helloWord.routes";
import { userRoutes } from "./user.routes";

export const appRoutes = (app: Express) => {
    app.use("/", HelloRoutes());
    app.use("/announcement", announcementRoutes);
    app.use("/user", userRoutes)
};