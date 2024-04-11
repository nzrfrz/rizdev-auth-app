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
exports.sendPasswordRecoveryLink = void 0;
require("dotenv/config");
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
const sendPasswordRecoveryLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const findResults = yield (0, _helpers_1.findOneDocument)(models_1.USERS, { email });
        if (findResults === null)
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.notFound, "Email not found", { email: "Email not found" });
        const generateToken = (0, _helpers_1.emailLinkTokenGenerator)({ id: findResults === null || findResults === void 0 ? void 0 : findResults._id.toString() });
        yield (0, _helpers_1.sendEmail)(req.headers.host.includes("localhost") ? "src/_emailTemplates/" : "dist/_emailTemplates/", findResults === null || findResults === void 0 ? void 0 : findResults.email, "Password Recovery", "Password Recovery", "passwordRecovery", { username: findResults === null || findResults === void 0 ? void 0 : findResults.username, url: `${req.headers.origin}/reset-password/${generateToken}` });
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, "Password recovery email has been send", undefined);
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, JSON.stringify(error.response));
    }
});
exports.sendPasswordRecoveryLink = sendPasswordRecoveryLink;
//# sourceMappingURL=sendPasswordRecoveryLink.ctrl.js.map