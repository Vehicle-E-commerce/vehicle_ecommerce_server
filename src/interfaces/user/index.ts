import { Address } from "../../entities/address.entity";

export interface IUser {
    name: string;
    email: string;
    cpf: string;
    telephone: string;
    birth_date: string;
    bio: string;
    is_advertiser: boolean;
    password: string;
    address: Address;
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
    address: Address;
}