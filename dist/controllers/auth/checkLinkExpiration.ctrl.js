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
exports.checkLinkExpiration = void 0;
require("dotenv/config");
const _helpers_1 = require("../../_helpers");
const checkLinkExpiration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.accepted, _helpers_1.message.onlySuccess, req === null || req === void 0 ? void 0 : req.token);
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, JSON.stringify(error.response));
    }
});
exports.checkLinkExpiration = checkLinkExpiration;
//# sourceMappingURL=checkLinkExpiration.ctrl.js.map