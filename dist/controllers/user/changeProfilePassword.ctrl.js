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
exports.changeProfilePassword = void 0;
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
const changeProfilePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.accessTokenData.id;
        const bodyPassword = req.body.password;
        const passwordValid = bodyPassword !== undefined && bodyPassword.length > 3;
        if (passwordValid === false)
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Not a valid password", undefined);
        const payload = { password: (0, _helpers_1.hashPassword)(bodyPassword), refreshToken: "" };
        const updateResults = yield (0, _helpers_1.updateByID)(models_1.USERS, userID, payload);
        const _a = updateResults.toJSON(), { password, refreshToken } = _a, rest = __rest(_a, ["password", "refreshToken"]);
        (0, _helpers_1.clearCookie)(res, process.env.TOKEN_COOKIE_NAME);
        (0, _helpers_1.clearCookie)(res, process.env.LOGIN_CREDENTIAL_COOKIE_NAME);
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, "Your password has been changed.  Please re-Login for change to take effect.", rest);
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, error.toString());
    }
});
exports.changeProfilePassword = changeProfilePassword;
//# sourceMappingURL=changeProfilePassword.ctrl.js.map