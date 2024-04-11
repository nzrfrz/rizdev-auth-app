import "dotenv/config";
import express from "express";

import { 
    status,
    message,
    responseHelper,
    sendEmail,
    findOneDocument,
    emailLinkTokenGenerator,
} from "../../_helpers";
import { USERS } from "../../models";

export const sendPasswordRecoveryLink = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.body;
        const findResults = await findOneDocument(USERS, { email });

        if (findResults === null) return responseHelper(res, status.notFound, "Email not found", { email: "Email not found" });

        const generateToken = emailLinkTokenGenerator({ id: findResults?._id.toString() });
        
        await sendEmail(
            req.headers.host.includes("localhost") ? "src/_emailTemplates/" : "dist/_emailTemplates/",
            findResults?.email,
            "Password Recovery",
            "Password Recovery",
            "passwordRecovery",
            { username: findResults?.username, url: `${req.headers.origin}/reset-password/${generateToken}` }
        );

        responseHelper(res, status.success, "Password recovery email has been send", undefined);
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error.response));
    }
};