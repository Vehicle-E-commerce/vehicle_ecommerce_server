import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import { createAnnouncementsService } from "../services/announcement/createAnnouncement.service";
import { deleteAnnouncementService } from "../services/announcement/deleteAnnouncement.service";
import { updateAnnouncementService } from "../services/announcement/updateAnnouncement.service";
import { listAnnouncementsService } from "../services/announcement/listAnnouncement.service";

export const createAnnouncementsController = async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.user.id

  const createAnnouncement = await createAnnouncementsService(data, id);

  return res.status(201).json(instanceToPlain(createAnnouncement));
};

export const listAnnouncementsController = async (req: Request, res: Response) => {
    const announcement_id = req.params.id;
  const announcements = await listAnnouncementsService(announcement_id);
  return res.json(instanceToPlain(announcements));
};

export const updateAnnouncementController = async (req: Request, res: Response) => {
  const updateData = req.body;
  const id = req.params.id;
  const user_id = req.user.id;

  const announcementToUpdate = await updateAnnouncementService(updateData, user_id);

  return res.json(instanceToPlain(instanceToPlain(announcementToUpdate)));
};

export const deleteAnnouncementController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user_id = req.user.id;
  await deleteAnnouncementService(id, user_id);

  return res.status(204).json({ message: "Announcement deleted!" });
};

