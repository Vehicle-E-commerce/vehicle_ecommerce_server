import { Router } from "express";
import { 
    createCommentController, 
    listCommentsController,
    updateCommentsController, 
    deleteCommentsController
} from "../controllers/comment.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";

export const commentsRoutes = Router();

commentsRoutes.post("/", authTokenMiddleware, createCommentController);
commentsRoutes.get("/", listCommentsController);
commentsRoutes.patch("/:id", authTokenMiddleware, updateCommentsController);
commentsRoutes.delete("/:id", authTokenMiddleware, deleteCommentsController);
