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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailLinkTokenChecker = exports.refreshTokenChecker = exports.accessTokenChecker = exports.cookiesChecker = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _helpers_1 = require("../_helpers");
;
;
const cookiesChecker = (req, res, next) => {
    const cookies = req.cookies;
    const cookieName = process.env.TOKEN_COOKIE_NAME;
    if (cookies[cookieName] === undefined || cookies[cookieName] === "")
        return (0, _helpers_1.responseHelper)(res, _helpers_1.status.forbidden, _helpers_1.message.forbidden, undefined);
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
exports.cookiesChecker = cookiesChecker;
const accessTokenChecker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.cookieData;
    jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.unauthorized, _helpers_1.message.accessTokenInvalid, undefined);
        else {
            req.accessTokenData = results;
            next();
        }
    }));
});
exports.accessTokenChecker = accessTokenChecker;
const refreshTokenChecker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookieData;
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.forbidden, _helpers_1.message.sessionExpired, undefined);
        else {
            req.refreshTokenData = results;
            next();
        }
    }));
});
exports.refreshTokenChecker = refreshTokenChecker;
const emailLinkTokenChecker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    jsonwebtoken_1.default.verify(token, process.env.EMAIL_LINK_TOKEN_SECRET, (error, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.expired, _helpers_1.message.expired, undefined);
        else {
            req.token = results;
            next();
        }
    }));
});
exports.emailLinkTokenChecker = emailLinkTokenChecker;
//# sourceMappingURL=authorizationChecker.js.map