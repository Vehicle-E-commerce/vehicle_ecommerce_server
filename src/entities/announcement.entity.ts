import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  ManyToOne, 
  OneToMany, 
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Comments } from "./comments.entity";
import { Images } from "./images.entity";
import { User } from "./user.entity";


@Entity("announcement")
export class Announcement {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 24 })
  title: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  price: number;

  @Column({ length: 255 })
  bio: string;

  @Column({ default: false })
  is_motorbike: boolean;

  @Column({ default: false })
  cover_image: string;

  @ManyToOne(()=> User, {eager: true})
  user: User

  @OneToMany(() => Images, (images) => images.announcement)
  images: Images[];

  @OneToMany(() => Comments, (comment) => comment.announcement)
  comments: Comments[];

  @CreateDateColumn({ type: "date" })
  created_at: Date;

  @UpdateDateColumn({ type: "date" })
  updated_at: Date;

}
