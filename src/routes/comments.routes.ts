import { Router } from "express";
import { 
    createCommentController, 
    listCommentsController,
    updateCommentsController, 
    deleteCommentsController
} from "../controllers/comment.controllers";

export const commentsRoutes = Router();

commentsRoutes.post("/", createCommentController);
commentsRoutes.get("/", listCommentsController);
commentsRoutes.patch("/:id", updateCommentsController);
commentsRoutes.delete("/:id", deleteCommentsController);
