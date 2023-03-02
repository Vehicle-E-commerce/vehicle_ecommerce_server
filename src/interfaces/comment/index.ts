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
    created_at: Date,
    updated_at: Date,
}

export interface ICommentListResponse {
       
}
  