import express from "express";

import { 
    status,
    message,
    sendEmail,
    updateByID,
    findDocByID,
    clearCookie,
    responseHelper,
    findOneDocument,
    emailLinkTokenGenerator,
} from "../../_helpers";
import { AuthData } from "../../middleware";
import { USERS, UserDocument } from "../../models";

interface PayloadOptionsInterface {
    payload: {},
    fieldChange: string[],
    responseMessage: string,
};

export const changeProfileUsernameAndEmail = async (req: AuthData, res: express.Response) => {
    try {
        const userID = req.accessTokenData.id;
        const { username, email } = req.body;

        const oldProfile = await findDocByID(USERS, userID);
        const isUsernameExist = await findOneDocument(USERS, { username });
        const isEmailExist = await findOneDocument(USERS, { email });        

        const validBodyReqUsername = username !== undefined && username !== "" && username.length > 3 && isUsernameExist === null;
        const validBodyReqEmail = email !== undefined && email !== "" && email.length > 3 && isEmailExist === null;

        let payloadOptions: PayloadOptionsInterface = {
            payload: {},
            fieldChange: [],
            responseMessage: "",
        };

        switch (true) {
            case validBodyReqUsername === true && validBodyReqEmail === true:
                payloadOptions.payload = { username, email, refreshToken: "", isActivated: false };
                payloadOptions.fieldChange = [ "username", "email" ];
                payloadOptions.responseMessage = "Your profile has been change.  We have sent an activation link to your email.";
                break;
            case validBodyReqUsername === true:
                payloadOptions.payload = { username, refreshToken: "" };
                payloadOptions.fieldChange = [ "username" ];
                payloadOptions.responseMessage = "Your username has been change.  Please re-Login for change to take effect.";
                break;
            case validBodyReqEmail === true:
                payloadOptions.payload = { email, refreshToken: "", isActivated: false };
                payloadOptions.fieldChange = [ "email" ];
                payloadOptions.responseMessage = "Your email has been change.  We have sent an activation link to your email.";
                break;
            case isUsernameExist !== null && username !== oldProfile?.username && isEmailExist !== null && email !== oldProfile?.email:
                return responseHelper(res, status.errorRequest, "Username an email exist, provide another email and username", { username: "Username exist", email: "Email exist" });
            case isUsernameExist !== null && username !== oldProfile?.username:
                return responseHelper(res, status.errorRequest, "Username exist, create another username", { username: "Username exist" });
            case isEmailExist !== null && email !== oldProfile?.email:
                return responseHelper(res, status.errorRequest, "Email exist, provide another email", { email: "Email exist" });
            default:
                return responseHelper(res, status.success, "No change has been made", undefined);
        };

        const updateResults = await updateByID<UserDocument>(USERS, userID, payloadOptions.payload);
        const { password, refreshToken, ...rest } = updateResults.toJSON();
        
        if (payloadOptions.fieldChange.includes("email") === true) {
            const generateToken = emailLinkTokenGenerator({ id: updateResults?._id.toString() });
            await sendEmail(
                req.headers.host.includes("localhost") ? "src/_emailTemplates/" : "dist/_emailTemplates/",
                updateResults.email,
                "Account Activation",
                "Account Activation",
                "accountActivation",
                { username: updateResults?.username, url: `${req.headers.origin}/activating-account/${generateToken}` }
            );
        }
        
        clearCookie(res, process.env.TOKEN_COOKIE_NAME);
        clearCookie(res, process.env.LOGIN_CREDENTIAL_COOKIE_NAME);

        responseHelper(res, status.success, payloadOptions.responseMessage, rest);
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error));
    }
};