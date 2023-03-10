import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";
import { IAddressUpdate } from "../../interfaces/addresse";

export const updateAddresService = async ({
    id,
    cep,
    state,
    city,
    road,
    number,
    complement,
}: IAddressUpdate, user_id: string) => {
    const addressRepository = AppDataSource.getRepository(Address)
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            id: user_id
        }
    })

    const addressData = await addressRepository.findOne({
        where: {
            id: user?.address.id
        }
    })
    
    await addressRepository.update(addressData!.id, {
        cep: cep ? cep : addressData!.cep,
        state: state ? state : addressData!.state,
        city: city ? city : addressData!.city,
        road: road ? road : addressData!.road,
        number: number ? number : addressData!.number,
        complement: complement ? complement : addressData!.complement
    })
    
    const updateAddress = await addressRepository.findOne({
        where: {
            id: user?.address.id
        }
    })
    
    return updateAddress
}