import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcement.entity";
import AppError from "../../errors/appErrors";
import { IAnnouncementRequest } from "../../interfaces";

export const createAnnouncementsService = async ({
  title,
  bio,
  cover_image,
  is_motorbike,
  mileage,
  price,
  year,
}: IAnnouncementRequest): Promise<Announcement> => {
  const announcementRepository = AppDataSource.getRepository(Announcement);

  if (!title || !cover_image || !bio || !mileage || !price || !year) {
    throw new AppError("Cannot make an empty post", 400);
  }

  if (title === "" || cover_image === "" || bio === "") {
    throw new AppError("Cannot make an empty post", 400);
  }

  const newAnnouncement = announcementRepository.create({
    bio,
    cover_image,
    is_motorbike,
    mileage,
    price,
    title,
    year,
  });
  await announcementRepository.save(newAnnouncement);

  const returnAnnouncement = await announcementRepository.find({
    where: {
      id: newAnnouncement.id,
    },
  });
  return returnAnnouncement[0];
};
