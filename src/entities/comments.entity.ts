import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";

import { Announcement } from "./announcement.entity";
import { User } from "./user.entity";



@Entity("comments")
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 255 })
  comment: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.comments, {
    eager: true,
  })
  announcement: Announcement;

  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
  })
  user: User;

  @CreateDateColumn({type: "date"})
  created_at: Date
  
  @UpdateDateColumn({type: "date"})
  updated_at: Date
}
