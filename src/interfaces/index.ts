import { Images } from "../entities/images.entity";

export interface IAnnouncementUpdate {
  id: string;
  title: string;
  year: number;
  mileage: number;
  price: number;
  bio: string;
  is_motorbike: boolean;
  cover_image: string;
}
export interface IAnnouncementRequest {
  title: string;
  year: number;
  mileage: number;
  price: number;
  bio: string;
  is_motorbike: boolean;
  cover_image: string;
  images?: string[];
}
