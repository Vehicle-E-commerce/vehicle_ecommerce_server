import { AppDataSource } from "../../data-source"
import { Announcement } from "../../entities/announcement.entity"

export const deleteAnnouncementService = async(
  id: string
):Promise<void> => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  await announcementRepository.delete(id)
}