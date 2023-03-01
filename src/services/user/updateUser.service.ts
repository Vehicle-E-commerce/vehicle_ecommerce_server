import { AppDataSource } from "../../data-source";

import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";

import { IUserUpdate } from "../../interfaces/user";
import { hashSync } from "bcrypt";

import AppError from "../../errors/appErrors";


export const updateUsersService = async ({
    name,
    cpf,
    email,
    telephone,
    address,
    bio,
    birth_date,
    is_advertiser,
    password,
    id
  }: IUserUpdate) => {
    const userRepository = AppDataSource.getRepository(User)
    const addressRepository = AppDataSource.getRepository(Address)

    const user = await userRepository.findOneBy({id})

    if(!user) {
        throw new AppError("User not found", 404)
    }

    const addressData = await addressRepository.findOne({
        where: {
            id: address.id
        }
    })

    await addressRepository.update(addressData!.id, {
        cep: address.cep || addressData?.cep,
        state: address.state || addressData?.state,
        city: address.city || addressData?.city,
        road: address.road || addressData?.road,
        number: address.number || addressData?.number,
        complement: address.complement || addressData?.complement
    })

    const updateAddress = await addressRepository.findOne({
        where: {
            id: address.id
        }
    })

    await userRepository.update(user.id, {
        name: name || user.name,
        cpf: cpf || user.cpf,
        email: email || user.email,
        telephone: telephone || user.telephone,
        address_id: address.id || updateAddress?.id,
        bio: bio || user.bio,
        birth_date: birth_date || user.birth_date,
        is_advertiser: is_advertiser || user.is_advertiser,
        password: hashSync(password, 10) || user.password,
    })

    const userUpdate = await userRepository.findOneBy({id})

    return userUpdate

}