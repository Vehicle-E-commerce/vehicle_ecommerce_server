import { Router } from "express";
import { deleteAnnouncementController, listAnnouncementsController, updateAnnouncementController } from "../controllers/announcement.controler";


export const announcementRoutes = Router();

announcementRoutes.get("/", listAnnouncementsController);
announcementRoutes.patch("/:id", updateAnnouncementController);
announcementRoutes.delete("/:id", deleteAnnouncementController);