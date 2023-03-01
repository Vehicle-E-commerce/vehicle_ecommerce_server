import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Announcement } from "./announcement.entity";
import { Comments } from "./comments.entity";
import { Exclude } from "class-transformer"; 
import { Address } from "./address.entity";
import { IsEmail } from "class-validator";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  @IsEmail()
  email: string;

  @Column({ length: 60 })
  @Exclude()
  password: string;

  @Column({ length: 11 })
  cpf: string;

  @Column()
  telephone: string;

  @Column()
  birth_date: string;

  @Column({ length: 255 })
  bio: string;

  @Column({ default: false })
  is_advertiser: boolean;

  @CreateDateColumn({ type: "date" })
  created_at: Date;

  @UpdateDateColumn({ type: "date" })
  updated_at: Date;

  @OneToOne(() => Address, {
    eager: true,
  })
  @JoinColumn({ name: "address_id" })
  address_id: string;

  @OneToMany(()=> Announcement, announcement => announcement.user)
  announcements: Announcement[]

  @OneToMany(() => Comments, (comment) => comment.announcement)
  comments: Comments[];
}

