import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import { createCommentService } from "../services/comments/createComment.service";
import { deleteCommentService } from "../services/comments/deleteComment.service";
import { updateCommentService } from "../services/comments/updateComment.service";
import { listCommentService } from "../services/comments/listComents.service";


export const createCommentController = async (req: Request, res: Response) => {
    const {comment} = req.body
    const announcement_id = req.params.id
    const id = req.user.id
    
    const createdComment = await createCommentService({comment, announcement_id, user_id: id})

    return res.status(201).json(instanceToPlain(createdComment))
}

export const listCommentsController = async (req: Request, res: Response) => {
    const announcement_id = req.params.id
    const listCommentsAnnouncment = await listCommentService(announcement_id)

    return res.status(200).json(instanceToPlain(listCommentsAnnouncment))
};

export const updateCommentsController = async (req: Request, res: Response) => {
    const { comment } = req.body
    const id = req.params.id
    const user_id = req.user.id
    
    const updatedComment = await updateCommentService({ updateComment: comment, id}, user_id)

    return res.status(200).json(instanceToPlain(updatedComment))
};

export const deleteCommentsController = async (req: Request, res: Response) => {
    const id = req.params.id
    const user_id = req.user.id

    await deleteCommentService(id, user_id)

    return res.status(204).send()
};
