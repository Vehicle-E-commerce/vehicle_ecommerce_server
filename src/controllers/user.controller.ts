import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import { createUsersService } from "../services/user/createUser.service";
import { updateUsersService } from "../services/user/updateUser.service";
import { deleteUserService } from "../services/user/deleteUser.service";
import { listUserService } from "../services/user/listUser.service";

export const createUsersController = async (req: Request, res: Response) => {
  const data = req.body;
  
  const createUsers = await createUsersService(data);
  
  return res.status(201).json(instanceToPlain(createUsers));
};

export const listUserController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const user = await listUserService(id);

  return res.json(instanceToPlain(user));
};

export const deleteUserController = async (req: Request, res: Response) => {
  // const id = req.params.id;
  const id = req.user.id;
  await deleteUserService(id);

  return res.status(204).json({ message: "User deleted!" });
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData = req.body

  // const id = req.params.id
  const id = req.user.id


  const userUpdate = await updateUsersService({...userData, id})

  return res.json(instanceToPlain(userUpdate))
}