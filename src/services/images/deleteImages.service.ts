import { AppDataSource } from "../../data-source";
import { Images } from "../../entities/images.entity";


export const deleteImageService = async (id: string): Promise<void> => {
  const imagesRepository = AppDataSource.getRepository(Images);
  await imagesRepository.delete(id);
};
