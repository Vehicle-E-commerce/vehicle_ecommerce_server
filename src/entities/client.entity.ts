import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"

@Entity("client")
class Client {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    password: string
    
    @Column()
    phone_number: string
    
    @CreateDateColumn({type: "date"})
    created_at: Date
    
    @UpdateDateColumn({type: "date"})
    updated_at: Date

}
export default Client;