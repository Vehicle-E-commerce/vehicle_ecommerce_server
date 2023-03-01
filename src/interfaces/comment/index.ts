import { Announcement } from "../../entities/announcement.entity";
import { User } from "../../entities/user.entity";

export interface ICommentRequest {
    comment: string;
    announcement_id: string;
    user_id: string;
}

export interface ICommentUpdate {
    id: string
    updateComment: string;
}

export interface ICommentResponse {
    id: string;
    comment: string;
    announcement: Announcement;
    user: User;
    createdAt: Date,
    updatedAt: Date,
}

export interface ICommentListResponse {
       
}
  