import express from "express";
import { 
    status,
    responseHelper,
    emailValidators,
} from "../_helpers";

export const validateRegistration = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { username, email, password } = req.body;

    switch (true) {
        case username === "" || username === undefined || username === null:
            return responseHelper(res, status.errorRequest, "Username still empty", { username: "Still empty" });
        case email === "" || email === undefined || email === null:
            return responseHelper(res, status.errorRequest, "Email still empty", { email: "Still empty" });
        case password === "" || password === undefined || password === null:
            return responseHelper(res, status.errorRequest, "Password still empty", { password: "Still empty" });
        case !emailValidators(email):
            return responseHelper(res, status.errorRequest, "Not a valid email address", { email: "Not valid" });
        default:
            next();
    }
};