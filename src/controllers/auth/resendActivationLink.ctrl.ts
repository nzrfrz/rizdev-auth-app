import "dotenv/config";
import express from "express";

import { 
    status,
    message,
    responseHelper,
    sendEmail,
    clearCookie,
    emailLinkTokenGenerator,
} from "../../_helpers";

export const resendActivationLink = async (req: express.Request, res: express.Response) => {
    try {
        const { id, username, email } = req.body;
        const generateToken = emailLinkTokenGenerator({ id });
        
        await sendEmail(
            req.headers.host.includes("localhost") ? "src/_emailTemplates/" : "dist/_emailTemplates/",
            email,
            "Account Activation",
            "Account Activation",
            "accountActivation",
            { username, url: `${req.headers.origin}/activating-account/${generateToken}` }
        );
        clearCookie(res, process.env.TOKEN_COOKIE_NAME);
        clearCookie(res, process.env.LOGIN_CREDENTIAL_COOKIE_NAME);
        responseHelper(res, status.success, "Email activation has been send", undefined);
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error));
    }
};