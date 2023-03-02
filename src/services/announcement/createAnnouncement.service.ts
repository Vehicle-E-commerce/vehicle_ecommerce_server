import { AppDataSource } from "../../data-source";

import { Announcement } from "../../entities/announcement.entity";
import { Images } from "../../entities/images.entity";

import { IAnnouncementRequest } from "../../interfaces/announcement";

import AppError from "../../errors/appErrors";
import { User } from "../../entities/user.entity";

export const createAnnouncementsService = async ({
  title,
  bio,
  cover_image,
  is_motorbike,
  mileage,
  price,
  year,
  images,
}: IAnnouncementRequest, id: string): Promise<Announcement> => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const userReporitory = AppDataSource.getRepository(User)

  const imagesRepository = AppDataSource.getRepository(Images);
  const user =  await userReporitory.findOneBy({id})

  if(!user) {
    throw new AppError("User not found.", 404)
  }
 
  if(!user.is_advertiser){
    throw new AppError("You don't have permission", 403);
  }

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
    user,
  });

  if (images) {
    const newImages = images.map((image) => imagesRepository.create({ image }));
    const imagesSave = await imagesRepository.save(newImages);
    newAnnouncement.images = imagesSave;
  }

  await announcementRepository.save(newAnnouncement);

  const returnAnnouncement = await announcementRepository.findOne({
    where: {
      id: newAnnouncement.id,
    },
    relations: {
      images: true,
    },
  });
  return returnAnnouncement!;
};
