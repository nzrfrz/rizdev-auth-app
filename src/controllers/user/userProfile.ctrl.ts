import express from "express";

import { 
    status,
    message,
    responseHelper,
    findDocByID,
} from "../../_helpers";
import { AuthData } from "../../middleware";

import { USERS, UserDocument } from "../../models";

export const userProfile = async (req: AuthData, res: express.Response) => {
    try {       
        const results = await findDocByID<UserDocument>(USERS, req.accessTokenData.id);
        const { _id, __v, password, ...rest } = results;
        responseHelper(res, status.success, message.onlySuccess, { ...rest, id: results._id });
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error));
    }
};