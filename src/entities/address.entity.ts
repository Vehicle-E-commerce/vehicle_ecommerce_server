import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  cep: number;

  @Column({ length: 24 })
  state: string;

  @Column({ length: 30 })
  city: string;

  @Column({ length: 50 })
  road: string;

  @Column()
  number: number;

  @Column({ length: 50 })
  complement: string;
}
