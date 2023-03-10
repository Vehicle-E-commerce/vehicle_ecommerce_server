import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcement.entity";

export const listAnnouncementsService = async (
  id: string | null
): Promise<any> => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  if (id) {
    const announcements = await announcementRepository.findOneBy({ id: id });
    return announcements;
  } else {
    const announcements = await announcementRepository.find({
      relations: {
        images: true,
      },
    });
    return announcements;
  }
};
