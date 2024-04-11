import express from "express";

import { 
    status,
    message,
    responseHelper,
    saveNewDocument,
    hashPassword,
    findOneDocument,
    sendEmail,
    emailLinkTokenGenerator,
    randomColorGenerator,
} from "../../_helpers";
import { USERS } from "../../models";

export const registration = async (req: express.Request, res: express.Response) => {
    console.log(req.headers.host);
    
    try {
        const { username, email, password, userRole } = req.body;
        const isUsernameExist = await findOneDocument(USERS, { username });
        const isEmailExist = await findOneDocument(USERS, { email });

        switch (true) {
            case isUsernameExist !== null:
                return responseHelper(res, status.errorRequest, "Username already exist", { username: "Username already exist" });
            case isEmailExist !== null:
                return responseHelper(res, status.errorRequest, "Email already associated with this account", { email: "Email already associated with this account" });
            default:
                const payload = new USERS({
                    username, 
                    email,
                    password: hashPassword(password),
                    userRole,
                    refreshToken: "",
                    avatarColor: randomColorGenerator(),
                    avatarImage: {
                        id: "",
                        url: ""
                    },
                    isActivated: false
                });
                const saveResults = await saveNewDocument(payload);
                const generateToken = emailLinkTokenGenerator({ id: saveResults?._id.toString() });
                
                await sendEmail(
                    req.headers.host.includes("localhost") ? "src/_emailTemplates/" : "dist/_emailTemplates/",
                    email,
                    "Account Activation",
                    "Account Activation",
                    "accountActivation",
                    { username, url: `${req.headers.origin}/activating-account/${generateToken}` }
                );
                responseHelper(res, status.success, message.onlySuccess, saveResults);
                // responseHelper(res, status.success, message.onlySuccess, {});
                break;
        }
    } catch (error) {     
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error));
    }
};