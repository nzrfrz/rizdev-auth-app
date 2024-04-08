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
exports.renewAccessToken = void 0;
require("dotenv/config");
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
const renewAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookieName = process.env.TOKEN_COOKIE_NAME;
        const getSelfResults = yield (0, _helpers_1.findOneDocument)(models_1.USERS, { _id: req.refreshTokenData.id });
        const signedData = {
            id: getSelfResults.toJSON().id,
            userRole: getSelfResults.userRole,
        };
        const accessToken = (0, _helpers_1.accessTokenGenerator)(signedData);
        const cookieValue = `${accessToken}${process.env.TOKEN_SEPARATOR}${getSelfResults.refreshToken}`;
        (0, _helpers_1.parseCookie)(res, cookieName, cookieValue, true);
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, _helpers_1.message.onlySuccess, {});
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, JSON.stringify(error));
    }
});
exports.renewAccessToken = renewAccessToken;
//# sourceMappingURL=renewAccessToken.ctrl.js.map