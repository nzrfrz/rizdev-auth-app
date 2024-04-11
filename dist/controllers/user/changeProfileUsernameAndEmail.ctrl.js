"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeProfileUsernameAndEmail = void 0;
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
;
const changeProfileUsernameAndEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.accessTokenData.id;
        const { username, email } = req.body;
        const oldProfile = yield (0, _helpers_1.findDocByID)(models_1.USERS, userID);
        const isUsernameExist = yield (0, _helpers_1.findOneDocument)(models_1.USERS, { username });
        const isEmailExist = yield (0, _helpers_1.findOneDocument)(models_1.USERS, { email });
        const validBodyReqUsername = username !== undefined && username !== "" && username.length > 3 && isUsernameExist === null;
        const validBodyReqEmail = email !== undefined && email !== "" && email.length > 3 && isEmailExist === null;
        let payloadOptions = {
            payload: {},
            fieldChange: [],
            responseMessage: "",
        };
        switch (true) {
            case validBodyReqUsername === true && validBodyReqEmail === true:
                payloadOptions.payload = { username, email, refreshToken: "", isActivated: false };
                payloadOptions.fieldChange = ["username", "email"];
                payloadOptions.responseMessage = "Your profile has been change.  We have sent an activation link to your email.";
                break;
            case validBodyReqUsername === true:
                payloadOptions.payload = { username, refreshToken: "" };
                payloadOptions.fieldChange = ["username"];
                payloadOptions.responseMessage = "Your username has been change.  Please re-Login for change to take effect.";
                break;
            case validBodyReqEmail === true:
                payloadOptions.payload = { email, refreshToken: "", isActivated: false };
                payloadOptions.fieldChange = ["email"];
                payloadOptions.responseMessage = "Your email has been change.  We have sent an activation link to your email.";
                break;
            case isUsernameExist !== null && username !== (oldProfile === null || oldProfile === void 0 ? void 0 : oldProfile.username) && isEmailExist !== null && email !== (oldProfile === null || oldProfile === void 0 ? void 0 : oldProfile.email):
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Username an email exist, provide another email and username", { username: "Username exist", email: "Email exist" });
            case isUsernameExist !== null && username !== (oldProfile === null || oldProfile === void 0 ? void 0 : oldProfile.username):
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Username exist, create another username", { username: "Username exist" });
            case isEmailExist !== null && email !== (oldProfile === null || oldProfile === void 0 ? void 0 : oldProfile.email):
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Email exist, provide another email", { email: "Email exist" });
            default:
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, "No change has been made", undefined);
        }
        ;
        const updateResults = yield (0, _helpers_1.updateByID)(models_1.USERS, userID, payloadOptions.payload);
        const _a = updateResults.toJSON(), { password, refreshToken } = _a, rest = __rest(_a, ["password", "refreshToken"]);
        if (payloadOptions.fieldChange.includes("email") === true) {
            const generateToken = (0, _helpers_1.emailLinkTokenGenerator)({ id: updateResults === null || updateResults === void 0 ? void 0 : updateResults._id.toString() });
            yield (0, _helpers_1.sendEmail)(req.headers.host.includes("localhost") ? "src/_emailTemplates/" : "dist/_emailTemplates/", updateResults.email, "Account Activation", "Account Activation", "accountActivation", { username: updateResults === null || updateResults === void 0 ? void 0 : updateResults.username, url: `${req.headers.origin}/activating-account/${generateToken}` });
        }
        (0, _helpers_1.clearCookie)(res, process.env.TOKEN_COOKIE_NAME);
        (0, _helpers_1.clearCookie)(res, process.env.LOGIN_CREDENTIAL_COOKIE_NAME);
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, payloadOptions.responseMessage, rest);
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, JSON.stringify(error));
    }
});
exports.changeProfileUsernameAndEmail = changeProfileUsernameAndEmail;
//# sourceMappingURL=changeProfileUsernameAndEmail.ctrl.js.map