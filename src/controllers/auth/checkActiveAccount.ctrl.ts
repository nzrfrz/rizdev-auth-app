import express from "express";

import { 
    status,
    message,
    responseHelper,
    sendEmail,
    clearCookie,
    findDocByID,
} from "../../_helpers";
import { USERS } from "../../models";

export const checkActiveAccount = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const results = await findDocByID(USERS, id);
        responseHelper(res, status.success, message.onlySuccess, { isActivated: results.isActivated });
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error.response));
    }
};