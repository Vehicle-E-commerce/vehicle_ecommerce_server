import { Request, Response } from "express";
import { createUsersService } from "../services/user/createUserService";

const createUsersController = async (req: Request, res: Response) => {
    const {
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
      address_id,
    } = req.body;
  
    const createUsers = await createUsersService({
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
      address_id,
    });
  
    return res.status(201).json(createUsers);
  };

  export default createUsersController