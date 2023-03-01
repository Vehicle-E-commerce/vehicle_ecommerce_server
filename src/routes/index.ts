import { Express } from "express";
import { announcementRoutes } from "./announcements.routes";

import { userRoutes } from "./user.routes";
import { commentsRoutes } from "./comments.routes";
import sessionRoutes from "./session.routes";

export const appRoutes = (app: Express) => {
    app.use("/announcement", announcementRoutes);
    app.use("/user", userRoutes)
    app.use("/announcement/:id/comments", commentsRoutes);
    
    app.use("/login", sessionRoutes);
};