import { Request, Response } from "express";
import { createUsersService } from "../services/user/createUser.service";

const createUsersController = async (req: Request, res: Response) => {
  const data = req.body;
  
  const createUsers = await createUsersService(data);
  
  return res.status(201).json(createUsers);
};

export default createUsersController