import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcement.entity";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appErrors";

export const deleteAnnouncementService = async(
  id: string,
  user_id: string
):Promise<void> => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const userRepository = AppDataSource.getRepository(User);

  const announcement = await announcementRepository.findOneBy({id});
  const user = await userRepository.findOneBy({id:user_id});

  if(!user) { throw new AppError("User not found.", 404) }
  if(!user.is_advertiser){ throw new AppError("You don't have permission", 403) }
  if(!announcement) { throw new AppError("announcement not found", 404) }

  await announcementRepository.delete(id)
};