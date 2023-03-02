import { AppDataSource } from "../../data-source";

import { Announcement } from "../../entities/announcement.entity";
import { IAnnouncementUpdate } from "../../interfaces/announcement";

import AppError from "../../errors/appErrors";
import { User } from "../../entities/user.entity";


export const updateAnnouncementService = async({
  id,
  title,
  year,
  mileage,
  price,
  bio,
  is_motorbike,
  cover_image
}: IAnnouncementUpdate, user_id: string) => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const userRepository = AppDataSource.getRepository(User);

  const announcement = await announcementRepository.findOneBy({id});
  const user = await userRepository.findOneBy({id:user_id});

  if(!user) { throw new AppError("User not found.", 404) }
  if(!user.is_advertiser){ throw new AppError("You don't have permission", 403) }
  if(!announcement) { throw new AppError("announcement not found", 404) }

  await announcementRepository.update(announcement.id, {
    title: title || announcement.title,
    year: year || announcement.year,
    mileage: mileage || announcement.mileage,
    price: price || announcement.price,
    bio: bio || announcement.bio,
    is_motorbike: is_motorbike || announcement.is_motorbike,
    cover_image: cover_image || announcement.cover_image
  })

  const updatedAnnouncement = announcementRepository.findOneBy({id});
  
  return updatedAnnouncement;
}