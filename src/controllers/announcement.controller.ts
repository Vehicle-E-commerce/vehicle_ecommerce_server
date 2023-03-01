import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import { createAnnouncementsService } from "../services/announcement/createAnnouncement.service";
import { deleteAnnouncementService } from "../services/announcement/deleteAnnouncement.service";
import { updateAnnouncementService } from "../services/announcement/updateAnnouncement.service";
import { listAnnouncementsService } from "../services/announcement/listAnnouncement.service";

export const createAnnouncementsController = async (req: Request, res: Response) => {
  const data = req.body;

  const createAnnouncement = await createAnnouncementsService(data);

  return res.status(201).json(instanceToPlain(createAnnouncement));
};

export const listAnnouncementsController = async (req: Request, res: Response) => {
  const announcements = await listAnnouncementsService();

  return res.json(instanceToPlain(announcements));
};

export const updateAnnouncementController = async (req: Request, res: Response) => {
  const updateData = req.body;
  const id = req.params.id;

  const announcementToUpdate = await updateAnnouncementService(updateData);

  return res.json(instanceToPlain(instanceToPlain(announcementToUpdate)));
};

export const deleteAnnouncementController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteAnnouncementService(id);

  return res.status(204).json({ message: "Announcement deleted!" });
};

