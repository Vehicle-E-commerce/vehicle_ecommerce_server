import { Express } from "express";
import { announcementRoutes } from "./announcements.routes";
import { commentsRoutes } from "./comments.routes";

export const appRoutes = (app: Express) => {
    app.use("/announcement", announcementRoutes);
    app.use("/announcement/:id/comments", commentsRoutes);
};