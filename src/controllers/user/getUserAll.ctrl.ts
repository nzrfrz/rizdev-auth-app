import express from "express";

import { 
    status,
    message,
    responseHelper,
    getAllDocument,
} from "../../_helpers";
import { AuthData } from "../../middleware";

import { USERS, UserDocument } from "../../models";

export const getUserAll = async (req: AuthData, res: express.Response) => {       
    try {
        const userRole = req.accessTokenData.userRole;
        let queryArg: string[] = [];

        switch (userRole) {
            case "ROOT":
                queryArg = [ "ADMIN", "ENDUSER" ];
                break;
            case "ADMIN":
                queryArg = [ "ADMIN", "ENDUSER" ];
                break;
            case "ENDUSER":
                queryArg = [ "ENDUSER" ];
                break;
            default:
                break;
        }
       
        const results = await getAllDocument<UserDocument>(USERS, { userRole: {$in: queryArg} });
        const temp = results.map((data) => {
            const { _id, __v, password, refreshToken, ...rest } = data;
            return {
                ...rest,
                id: data._id
            };
        });

        responseHelper(res, status.success, message.onlySuccess, temp);
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, error.toString());
    }
};