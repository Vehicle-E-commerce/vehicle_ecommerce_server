import { Request, Response } from "express";

import { createImageService } from "../services/images/createImages.service";
import { deleteImageService } from "../services/images/deleteImages.service";

export const createImageController = async (req: Request, res: Response) => {
  const data = req.body;
  data.announcement = req.params.announcement_id;

  const createImage = await createImageService(data);

  return res.status(201).json(createImage);
};

export const deleteImageController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteImageService(id);

  return res.status(204).json({ message: "Image deleted!" });
};
