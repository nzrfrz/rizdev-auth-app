import "dotenv/config";
import express from "express";

import { 
    status,
    message,
    updateByID,
    clearCookie,
    responseHelper,
} from "../../_helpers";
import { USERS } from "../../models";
import { AuthData } from "../../middleware";

export const logout = async (req: AuthData, res: express.Response) => {
    try {
        const { id } = req.cookieData;
        const updatePayload = { refreshToken: "" };
        await updateByID(USERS, id, updatePayload);
        clearCookie(res, process.env.TOKEN_COOKIE_NAME);
        clearCookie(res, process.env.LOGIN_CREDENTIAL_COOKIE_NAME);
        responseHelper(res, status.success, "Logout success", {});
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, error.toString());
    }
};