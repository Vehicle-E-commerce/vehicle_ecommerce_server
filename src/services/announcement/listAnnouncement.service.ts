import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcement.entity";

export const listAnnouncementsService = async (): Promise<Announcement[]> => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const announcements = await announcementRepository.find({
    relations: {
      images: true,
    },
  });

  return announcements;
};
