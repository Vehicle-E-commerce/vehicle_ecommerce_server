import { Express } from "express";
import { announcementRoutes } from "./announcements.routes";
import { userRoutes } from "./user.routes";
import { commentsRoutes } from "./comments.routes";
import sessionRoutes from "./session.routes";
import { imageRoutes } from "./images.routes";
import resetPasswordRoute from "./resetPassword.routes";
import { addressRoutes } from "./address.routes";

export const appRoutes = (app: Express) => {
    app.use("/user", userRoutes)
    app.use("/login", sessionRoutes);
    
    app.use("/announcements", announcementRoutes);
    app.use("/announcement", commentsRoutes);
    app.use("/images", imageRoutes);
    app.use("/forgot-password", resetPasswordRoute)
    app.use("/address", addressRoutes)
};