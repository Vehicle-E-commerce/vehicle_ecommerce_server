import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { User } from "../../entities/user.entity";

import AppError from "../../errors/appErrors";

export const deleteCommentService = async (
    id: string,
    user_id: string
): Promise<boolean> => {
    const commentRepository = AppDataSource.getRepository(Comments)
    const userRepository = AppDataSource.getRepository(User)

    const comment = await commentRepository.findOneBy({id})
    const user = await userRepository.findOneBy({id: user_id})

    
    if(!user){ throw new AppError("User not found", 404) };
    if(!comment){ throw new AppError("Comment not found", 404) };
    if(comment.user.id != user_id) { throw new AppError("You don't have permission", 403) }

    await commentRepository.delete(id)

    return true
};
