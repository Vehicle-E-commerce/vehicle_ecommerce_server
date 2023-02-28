import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcement.entity";
import { Comments } from "../../entities/comments.entity";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appErrors";
import { ICommentRequest, ICommentResponse } from "../../interfaces/comments";

export const createCommentService = async ({ 
  comment,
  announcement_id,
  user_id
}: ICommentRequest): Promise<ICommentResponse> => {
  const commentRepository = AppDataSource.getRepository(Comments);
  const userRepository = AppDataSource.getRepository(User);
  const announcementRepository = AppDataSource.getRepository(Announcement);

  const user = await userRepository.findOneBy({id: user_id})
  const announcement = await announcementRepository.findOneBy({id: announcement_id})
  
  if (!comment || comment == "") { throw new AppError("Cannot make an empty comment", 400) }
  if(!user){ throw new AppError("User not found", 404) };
  if(!announcement){ throw new AppError("Announcement not found", 404) };

  const newComment = commentRepository.create({
    comment,
    user,
    announcement
  });
  await commentRepository.save(newComment);

  const createdComment = await commentRepository.find({
    where: {
      id: newComment.id,
    },
  });
  
  return createdComment[0];
};
