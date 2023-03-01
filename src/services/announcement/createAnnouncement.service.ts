import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcement.entity";
import { Images } from "../../entities/images.entity";
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
  images,
}: IAnnouncementRequest): Promise<Announcement> => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const imagesRepository = AppDataSource.getRepository(Images);

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
