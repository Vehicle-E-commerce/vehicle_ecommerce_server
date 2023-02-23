import { AppDataSource } from "../../data-source"
import { Announcement } from "../../entities/announcement.entity"
import AppError from "../../errors/appErrors";
import { IAnnouncementUpdate } from "../../interfaces";

export const updateAnnouncementService = async({
  id,
  title,
  year,
  mileage,
  price,
  bio,
  is_motorbike,
  cover_image
}: IAnnouncementUpdate) => {
  const announcementRepository = AppDataSource.getRepository(Announcement);

  const announcement = await announcementRepository.findOneBy({id});

  if(!announcement) {
    throw new AppError("announcement not found", 404)
  }

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