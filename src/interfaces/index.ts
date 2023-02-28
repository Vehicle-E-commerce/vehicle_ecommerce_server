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
}

export interface IAddress {
  cep: string;
  state: string;
  city: string;
  road: string;
  number: string;
  complement: string;
}

export interface IAddressUpdate {
  id: string;
  cep: string;
  state: string;
  city: string;
  road: string;
  number: string;
  complement: string;
}

export interface IUser {
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  birth_date: string;
  bio: string;
  is_advertiser: boolean;
  password: string;
  confirm_password: string;
  address: IAddress;
}

export interface IUserUpdate {
  id: string;
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  birth_date: string;
  bio: string;
  is_advertiser: boolean;
  password: string;
  confirm_password: string;
  address: IAddressUpdate;
}
