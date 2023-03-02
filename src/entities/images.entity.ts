import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from "typeorm";

import { Announcement } from "./announcement.entity";

@Entity("images")
export class Images {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 255 })
  image: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.images, {
    onDelete: "CASCADE",
  })
  announcement: Announcement;

  @CreateDateColumn({ type: "date" })
  created_at: Date;

  @UpdateDateColumn({ type: "date" })
  updated_at: Date;
}
