import express from "express";

import { 
    status,
    message,
    updateByID,
    clearCookie,
    hashPassword,
    responseHelper,
} from "../../_helpers";
import { AuthData } from "../../middleware";
import { USERS, UserDocument } from "../../models";

export const changeProfilePassword = async (req: AuthData, res: express.Response) => {
    try {
        const userID = req.accessTokenData.id;
        const bodyPassword = req.body.password;

        const passwordValid = bodyPassword !== undefined && bodyPassword.length > 3;

        if (passwordValid === false) return responseHelper(res, status.errorRequest, "Not a valid password", undefined);

        const payload = { password: hashPassword(bodyPassword), refreshToken: "" };
        const updateResults = await updateByID<UserDocument>(USERS, userID, payload);
        const { password, refreshToken, ...rest } = updateResults.toJSON();
        clearCookie(res, process.env.TOKEN_COOKIE_NAME);
        clearCookie(res, process.env.LOGIN_CREDENTIAL_COOKIE_NAME);

        responseHelper(res, status.success, "Your password has been changed.  Please re-Login for change to take effect.", rest);
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, error.toString());
    }
};