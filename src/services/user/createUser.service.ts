import { AppDataSource } from "../../data-source";

import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";

import { IUser } from "../../interfaces/user";
import { hashSync } from "bcrypt";

import AppError from "../../errors/appErrors";

export const createUsersService = async ({
    name,
    cpf,
    email,
    telephone,
    address,
    bio,
    birth_date,
    is_advertiser,
    password,
  }: IUser): Promise<User> => {
    const userData = AppDataSource.getRepository(User)
    
    const addressData = AppDataSource.getRepository(Address)

    if (!name || !cpf || !bio || !birth_date || !email || !address || !telephone || !password) {
        throw new AppError("Cannot make an empty post", 400);
    }

    const userEmail = await userData.findOneBy({ email})

    if(userEmail){
      throw new AppError("User email already exists", 409);
    }

    const newAddress = addressData.create({
      cep: address.cep,
      city: address.city,
      complement: address.complement,
      number: address.number,
      road: address.road,
      state: address.state,
    })
    
    await addressData.save(newAddress)

    const addressReturn = await addressData.find({
      where: {
        id: newAddress.id
      }
    })

    const newUser = userData.create({
        bio,
        name,
        cpf,
        email,
        telephone,
        password: hashSync(password, 10),
        is_advertiser,
        birth_date,
        address: addressReturn[0],
    })

    await userData.save(newUser)

    const userReturn = await userData.find({
      where: {
        id: newUser.id,
      }
    })
    return userReturn[0]
  }