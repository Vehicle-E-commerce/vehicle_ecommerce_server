import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comments } from "./comments.entity";
import { Images } from "./images.entity";

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

  @OneToMany(() => Images, (images) => images.announcement, {
    eager: true,
  })
  images: Images[];

  @OneToMany(() => Comments, (comment) => comment.announcement, {
    eager: true,
  })
  comments: Comments[];

}
