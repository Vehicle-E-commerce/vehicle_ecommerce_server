import { Router } from "express";
import { 
    createCommentController, 
    listCommentsController,
    updateCommentsController, 
    deleteCommentsController
} from "../controllers/comment.controllers";

import { authTokenMiddleware } from "../middlewares/authToken.middleware";

export const commentsRoutes = Router();

commentsRoutes.get("/:id/comments", listCommentsController);

commentsRoutes.post("/:id/comment", authTokenMiddleware, createCommentController);
commentsRoutes.patch("/comment/:id", authTokenMiddleware, updateCommentsController);
commentsRoutes.delete("/comment/:id", authTokenMiddleware, deleteCommentsController);
