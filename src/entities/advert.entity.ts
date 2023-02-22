import { 
  Column, 
  Entity, 
  JoinTable, 
  ManyToOne, 
  OneToMany, 
  PrimaryGeneratedColumn 
} from "typeorm";

@Entity("advert")
export class Advert {
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

  // @OneToMany((type) => AuctionAdvert, (auction) => auction.advert, {
  //   eager: true
  // })
  // @JoinTable()
  // auctionAdverts: AuctionAdvert[]

  // // RELAÇÃO COM IMAGENS

  // @OneToMany((type) => Image, (image) => image.advert, {
  //   eager: true
  // })
  // @JoinTable()
  // images: Image[]

  // // RELAÇÃO DE COMENTÁRIOS

  // @ManyToOne((type) => Comment, (comment) => comment.advert, {
  //   eager: true
  // })
  // @JoinTable()
  // comments: Comment[]

}