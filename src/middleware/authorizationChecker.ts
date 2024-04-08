import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";

import { 
    status,
    message,
    responseHelper,
} from "../_helpers";

export interface AuthData extends express.Request {
    cookieData?: {
        id?: string,
        userRole?: string
        accessToken?: string,
        refreshToken?: string
    },
    refreshTokenData: {
        id?: string,
        userRole?: string,
    },
    accessTokenData: {
        id?: string,
        userRole?: string,
    },
    token?: {
        id?: string,
    }
};

interface JwtPayload {
    id?: string,
    userRole?: string,
};

export const cookiesChecker = (
    req: AuthData, 
    res: express.Response, 
    next: express.NextFunction
    ) => {
    const cookies = req.cookies;
    const cookieName = process.env.TOKEN_COOKIE_NAME;

    if (cookies[cookieName] === undefined || cookies[cookieName] === "") return responseHelper(res, status.forbidden, message.forbidden, undefined);

    const temp = cookies[cookieName].split(`${process.env.TOKEN_SEPARATOR}`);
    const accessToken = temp[0];
    const refreshToken = temp[1];
    const tokenData = {
        accessToken,
        refreshToken
    };
    req.cookieData = tokenData;
    next();
};

export const accessTokenChecker = async (
    req: AuthData, 
    res: express.Response, 
    next: express.NextFunction
    ) => {
    const { accessToken } = req.cookieData;
    
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (error, results: JwtPayload) => {
        if (error) return responseHelper(res, status.unauthorized, message.accessTokenInvalid, undefined);
        else {
            req.accessTokenData = results;
            next();
        }
    });
};

export const refreshTokenChecker = async (
    req: AuthData, 
    res: express.Response, 
    next: express.NextFunction
    ) => {
    const { refreshToken } = req.cookieData;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, results: JwtPayload) => {
        if (error) return responseHelper(res, status.forbidden, message.sessionExpired, undefined);
        else {
            req.refreshTokenData = results;
            next();
        }
    });
};

export const emailLinkTokenChecker = async (
    req: AuthData, 
    res: express.Response, 
    next: express.NextFunction
    ) => {
    const { token } = req.params;

    jwt.verify(token, process.env.EMAIL_LINK_TOKEN_SECRET, async (error, results: JwtPayload) => {
        if (error) return responseHelper(res, status.expired, message.expired, undefined);
        else {
            req.token = results;
            next();
        }
    });
};