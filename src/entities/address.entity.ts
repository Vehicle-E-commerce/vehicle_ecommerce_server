import { 
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  cep: string;

  @Column({ length: 24 })
  state: string;

  @Column({ length: 30 })
  city: string;

  @Column({ length: 50 })
  road: string;

  @Column()
  number: string;

  @Column({ length: 50 })
  complement: string;
}
