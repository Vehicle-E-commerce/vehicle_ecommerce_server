import { 
  Column, 
  Entity, 
  JoinTable, 
  ManyToOne, 
  OneToMany, 
  PrimaryGeneratedColumn 
} from "typeorm";

@Entity("announcement")
export class Announcement {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({ length: 24 })
  title: string

  @Column()
  year: number

  @Column()
  mileage: number

  @Column()
  price: number

  @Column({ length: 255 })
  bio: string

  @Column({ default: false })
  is_motorbike: boolean

  @Column({ default: false })
  cover_image: boolean

  // // RELAÇÃO COM ANUNCIOS EM LEILÃO

  // @OneToMany((type) => AuctionAnnouncement, (auction) => auction.announcement, {
  //   eager: true
  // })
  // @JoinTable()
  // auctionAnnouncement: AuctionAnnouncement[]

  // // RELAÇÃO COM IMAGENS

  // @OneToMany((type) => Image, (image) => image.announcement, {
  //   eager: true
  // })
  // @JoinTable()
  // images: Image[]

  // // RELAÇÃO DE COMENTÁRIOS

  // @ManyToOne((type) => Comment, (comment) => comment.announcement, {
  //   eager: true
  // })
  // @JoinTable()
  // comments: Comment[]

}