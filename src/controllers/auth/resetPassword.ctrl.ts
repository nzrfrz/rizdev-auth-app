import express from "express";

import { 
    status,
    message,
    responseHelper,
    updateByID,
    hashPassword,
} from "../../_helpers";
import { AuthData } from "../../middleware";
import { USERS, UserDocument } from "../../models";

const temporaryPasswordLength = 3;

export const resetPassword = async (req: AuthData, res: express.Response) => {
    try {
        const { id, password } = req.body;
        
        if(id === undefined) return responseHelper(res, status.errorRequest, 'Missing <User ID> in your request', {});
        if (password.length === 0 || password.length <= temporaryPasswordLength) return responseHelper(res, status.errorRequest, `Password must more than ${temporaryPasswordLength} characters`, { password: `Password must more than ${temporaryPasswordLength} characters` });

        const editedPayload = {
            password: hashPassword(password)
        };
        const results = await updateByID<UserDocument>(USERS, id, editedPayload);
        responseHelper(res, status.success, "Password has been reset, you can now login", results);
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error.response));
    }
};