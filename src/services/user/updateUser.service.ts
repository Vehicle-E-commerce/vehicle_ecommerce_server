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
}: IUserUpdate, id: string) => {
    const userRepository = AppDataSource.getRepository(User)
    const addressRepository = AppDataSource.getRepository(Address)
    
    const user = await userRepository.findOneBy({id})
    
    if(!user) {
        throw new AppError("User not found", 404)
    }

    const test = user.address
    
    const addressData = await addressRepository.findOne({
        where: {
            id: user.address.id
        }
    })
    
    await addressRepository.update(addressData!.id, {
        cep: address ? address.cep : addressData!.cep,
        state: address ? address.state : addressData!.state,
        city: address ? address.city : addressData!.city,
        road: address ? address.road : addressData!.road,
        number: address ? address.number : addressData!.number,
        complement: address ? address.complement : addressData!.complement
    })
    
    const updateAddress = await addressRepository.findOne({
        where: {
            id: address?.id
        }
    })

    await userRepository.update(user.id, {
        name: name ? name : user.name,
        cpf: cpf ? cpf : user.cpf,
        email: email ? email : user.email,
        telephone: telephone ? telephone : user.telephone,
        address: updateAddress!,
        bio: bio ? bio : user.bio,
        birth_date: birth_date ? birth_date : user.birth_date,
        is_advertiser: is_advertiser ? is_advertiser : user.is_advertiser,
        password: password ? hashSync(password, 10) : user.password,
    })
    
    const userUpdate = await userRepository.findOneBy({id})

    return userUpdate
    
}