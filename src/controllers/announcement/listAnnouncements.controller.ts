import { Request, Response } from "express";
import { listAnnouncementsService } from "../../services/announcement/listAnnouncements.service";

export const listAnnouncementsController = async(req: Request, res: Response) => {
  const announcements = await listAnnouncementsService();
  
  return res.json(announcements);
}