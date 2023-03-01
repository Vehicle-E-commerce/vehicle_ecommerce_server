import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcement.entity";
import { Comments } from "../../entities/comments.entity";
import AppError from "../../errors/appErrors";

export const listCommentService = async ( announcement_id: string): Promise<Comments[]> => {
    const commentRepository = AppDataSource.getRepository(Comments)
    const announcementRepository = AppDataSource.getRepository(Announcement);

    const announcement = await announcementRepository.findOneBy({id: announcement_id})
    if(!announcement){ throw new AppError("announcement not found", 404) };

    const comments = await commentRepository.find({
        where:{ announcement: {id: announcement_id}
    }})

    return comments;
};
