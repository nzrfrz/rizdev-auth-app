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
exports.resetPassword = void 0;
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
const temporaryPasswordLength = 3;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, password } = req.body;
        if (id === undefined)
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, 'Missing <User ID> in your request', {});
        if (password.length === 0 || password.length <= temporaryPasswordLength)
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, `Password must more than ${temporaryPasswordLength} characters`, { password: `Password must more than ${temporaryPasswordLength} characters` });
        const editedPayload = {
            password: (0, _helpers_1.hashPassword)(password)
        };
        const results = yield (0, _helpers_1.updateByID)(models_1.USERS, id, editedPayload);
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, "Password has been reset, you can now login", results);
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, JSON.stringify(error.response));
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=resetPassword.ctrl.js.map