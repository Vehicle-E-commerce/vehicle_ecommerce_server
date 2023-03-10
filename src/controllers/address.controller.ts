import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { updateAddresService } from "../services/address/updateAddress.service";

export const updateAddressController = async (req: Request, res: Response) => {
    const updateData = req.body;
    const user_id = req.user.id;
    
    const addressToUpdate = await updateAddresService(updateData, user_id);
  
    return res.json(instanceToPlain(instanceToPlain(addressToUpdate)));
  };