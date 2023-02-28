import { hashSync } from "bcrypt";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/address.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appErrors";
import { IUser} from "../../interfaces";

export const createUsersService = async ({
    name,
    cpf,
    email,
    telephone,
    address,
    bio,
    birth_date,
    confirm_password,
    is_advertiser,
    password,
  }: IUser): Promise<User> => {
    const userData = AppDataSource.getRepository(User)
    
    const addressData = AppDataSource.getRepository(Address)

    if (!name || !cpf || !bio || !birth_date || !email || !address || !is_advertiser || !telephone || !confirm_password || !password) {
        throw new AppError("Cannot make an empty post", 400);
    }

    const userEmail = await userData.findOneBy({ email})

    if(userEmail){
      throw new AppError("User email already exists");
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
        confirm_password,
        is_advertiser,
        birth_date,
        address_id: addressReturn[0].id,
    })

    await userData.save(newUser)

    const userReturn = await userData.find({
      where: {
        id: newUser.id,
      }
    })
    return userReturn[0]
  }