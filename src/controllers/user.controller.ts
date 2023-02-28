import { Request, Response } from "express";
import { createUsersService } from "../services/user/createUser.service";
import { deleteUserService } from "../services/user/deleteUser.service";
import { listUsersService } from "../services/user/listUsers.service";
import { updateUsersService } from "../services/user/updateUser.service";

const createUsersController = async (req: Request, res: Response) => {
  const data = req.body;
  
  const createUsers = await createUsersService(data);
  
  return res.status(201).json(createUsers);
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.json(users);
};

const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteUserService(id);

  return res.json({ message: "User deleted!" });
};

const updateUserController = async (req: Request, res: Response) => {
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
    password} = req.body

  const id = req.params.id


  const userUpdate = await updateUsersService({
    id,
    name,
    cpf,
    email,
    telephone,
    address,
    bio,
    birth_date,
    confirm_password,
    is_advertiser,
    password
  })

  return res.json(userUpdate)
}


export {
  createUsersController,
  listUsersController,
  deleteUserController,
  updateUserController,
}