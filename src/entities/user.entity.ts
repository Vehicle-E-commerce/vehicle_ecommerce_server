import { IsEmail } from "class-validator";
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
import { Address } from "./address.entity";
import { Comments } from "./comments.entity";

@Entity("user")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  @IsEmail()
  email: string;

  @Column({ length: 60, select: false })
  password: string;

  @Column({ length: 60, select: false })
  confirm_password: string;

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

  @OneToMany(() => Comments, (comment) => comment.announcement, {
    eager: true,
  })
  comments: Comments[];
}

export default User