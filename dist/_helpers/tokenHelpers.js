"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailLinkTokenGenerator = exports.accessTokenGenerator = exports.refreshTokenGenerator = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
const refreshTokenGenerator = (dataToSign) => {
    const refreshToken = jsonwebtoken_1.default.sign(dataToSign, process.env.REFRESH_TOKEN_SECRET, { algorithm: "HS512", expiresIn: "2h" });
    return refreshToken;
};
exports.refreshTokenGenerator = refreshTokenGenerator;
const accessTokenGenerator = (dataToSign) => {
    const accessToken = jsonwebtoken_1.default.sign(dataToSign, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS512", expiresIn: "2m" });
    return accessToken;
};
exports.accessTokenGenerator = accessTokenGenerator;
const emailLinkTokenGenerator = (dataToSign) => {
    const emailLinkToken = jsonwebtoken_1.default.sign(dataToSign, process.env.EMAIL_LINK_TOKEN_SECRET, { algorithm: "HS512", expiresIn: "2m" });
    return emailLinkToken;
};
exports.emailLinkTokenGenerator = emailLinkTokenGenerator;
//# sourceMappingURL=tokenHelpers.js.map