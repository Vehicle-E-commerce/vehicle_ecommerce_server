import { Request, Response } from "express";
import { updateAnnouncementService } from "../../services/announcement/updateAnnouncement.service";

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