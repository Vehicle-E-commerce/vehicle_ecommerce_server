import { Request, Response } from "express";
import { deleteAnnouncementService } from "../services/announcement/deleteAnnouncement.service";
import { listAnnouncementsService } from "../services/announcement/listAnnouncement.service";
import { updateAnnouncementService } from "../services/announcement/updateAnnouncement.service";


const listAnnouncementsController = async(req: Request, res: Response) => {
  const announcements = await listAnnouncementsService();
  
  return res.json(announcements);
}

const updateAnnouncementController = async(req: Request, res: Response) => {
  const {
    title, year, mileage, price, bio, is_motorbike, cover_image
  } = req.body;
  const id = req.params.id;

  const announcementToUpdate = await updateAnnouncementService({
    id, title, year, mileage, price, bio, is_motorbike, cover_image
  });
  
  return res.json(announcementToUpdate);
}

const deleteAnnouncementController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteAnnouncementService(id);

  return res.json({message: "Announcement deleted!"})
}

export {
  listAnnouncementsController,
  updateAnnouncementController,
  deleteAnnouncementController
}