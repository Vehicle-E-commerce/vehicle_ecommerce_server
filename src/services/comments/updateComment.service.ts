import { AppDataSource } from "../../data-source";

import { Comments } from "../../entities/comments.entity";
import { ICommentUpdate } from "../../interfaces/comment";

import AppError from "../../errors/appErrors";
import { User } from "../../entities/user.entity";

export const updateCommentService = async ({
    updateComment,
    id
}: ICommentUpdate, user_id: string): Promise<Comments> => {
    const commentRepository = AppDataSource.getRepository(Comments)
    const userRepository = AppDataSource.getRepository(User)

    const comment = await commentRepository.findOneBy({id})
    const user = await userRepository.findOneBy({id: user_id})

    
    if(!user){ throw new AppError("User not found", 404) };
    if(!comment){ throw new AppError("Comment not found", 404) };
    if(comment.user.id != user_id) { throw new AppError("You don't have permission", 403) }

    if (updateComment === "") { throw new AppError("Comment cannot be empty", 400) };

    const newData = {
       comment: updateComment
    }

    await commentRepository.update(id, newData)

    const newComment = await commentRepository.find({ where: { id: id } })

    return newComment[0];
};
