import { AppDataSource } from "../../data-source";

import { Comments } from "../../entities/comments.entity";
import { ICommentUpdate } from "../../interfaces/comment";

import AppError from "../../errors/appErrors";

export const updateCommentService = async ({
    updateComment,
    id
}: ICommentUpdate): Promise<Comments> => {
    const commentRepository = AppDataSource.getRepository(Comments)
    const comment = await commentRepository.findOneBy({ id })

    if (!comment) { throw new AppError("Comment not found", 404) };

    const newData = {
        ...comment,
        comment: updateComment
    }

    await commentRepository.update(id, newData)

    const newComment = await commentRepository.find({ where: { id: id } })

    return newComment[0];
};
