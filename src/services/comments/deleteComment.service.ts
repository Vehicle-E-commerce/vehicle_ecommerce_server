import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import AppError from "../../errors/appErrors";

export const deleteCommentService = async (id: string): Promise<boolean> => {
    const commentRepository = AppDataSource.getRepository(Comments)
    const comment = await commentRepository.findOneBy({id})
    
    if(!comment){ throw new AppError("Comment not found", 404) };

    await commentRepository.delete(id)

    return true
};
