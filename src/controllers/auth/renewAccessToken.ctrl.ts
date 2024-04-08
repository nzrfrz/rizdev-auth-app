import "dotenv/config";
import express from "express";

import { 
    status,
    message,
    responseHelper,
    findOneDocument,
    accessTokenGenerator,
    parseCookie,
} from "../../_helpers";
import { AuthData } from "../../middleware";
import { USERS, UserDocument } from "../../models";

export const renewAccessToken = async (req: AuthData, res: express.Response) => {
    try {
        const cookieName = process.env.TOKEN_COOKIE_NAME;
        const getSelfResults = await findOneDocument<UserDocument>(USERS, { _id: req.refreshTokenData.id });
        const signedData = {
            id: getSelfResults.toJSON().id,
            userRole: getSelfResults.userRole,
        };
        const accessToken = accessTokenGenerator(signedData);
        const cookieValue = `${accessToken}${process.env.TOKEN_SEPARATOR}${getSelfResults.refreshToken}`;
        parseCookie(res, cookieName, cookieValue, true);
        responseHelper(res, status.success, message.onlySuccess, {});
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error));
    }
};