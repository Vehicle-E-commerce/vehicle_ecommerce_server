import { AppDataSource } from "../../data-source";
import { Images } from "../../entities/images.entity";

export const createImageService = async ({
  image,
  announcement,
}: Images): Promise<Images> => {
  const imageRepository = AppDataSource.getRepository(Images);

  const imageCreate = imageRepository.create({
    image,
    announcement,
  });

  await imageRepository.save(imageCreate);

  return imageCreate;
};
