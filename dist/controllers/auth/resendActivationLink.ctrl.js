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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendActivationLink = void 0;
require("dotenv/config");
const _helpers_1 = require("../../_helpers");
const resendActivationLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, username, email } = req.body;
        const generateToken = (0, _helpers_1.emailLinkTokenGenerator)({ id });
        yield (0, _helpers_1.sendEmail)(req.headers.host.includes("localhost") ? "src/_emailTemplates/" : "dist/_emailTemplates/", email, "Account Activation", "Account Activation", "accountActivation", { username, url: `${req.headers.origin}/activating-account/${generateToken}` });
        (0, _helpers_1.clearCookie)(res, process.env.TOKEN_COOKIE_NAME);
        (0, _helpers_1.clearCookie)(res, process.env.LOGIN_CREDENTIAL_COOKIE_NAME);
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, "Email activation has been send", undefined);
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, JSON.stringify(error));
    }
});
exports.resendActivationLink = resendActivationLink;
//# sourceMappingURL=resendActivationLink.ctrl.js.map