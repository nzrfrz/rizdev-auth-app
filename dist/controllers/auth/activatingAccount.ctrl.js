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
exports.activatingAccount = void 0;
const _helpers_1 = require("../../_helpers");
// import WebSocket from 'ws';
const models_1 = require("../../models");
const activatingAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const findResults = yield (0, _helpers_1.findDocByID)(models_1.USERS, (_a = req === null || req === void 0 ? void 0 : req.token) === null || _a === void 0 ? void 0 : _a.id);
        if ((findResults === null || findResults === void 0 ? void 0 : findResults.isActivated) === true)
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Account already active", { status: _helpers_1.status.errorRequest });
        if (findResults === null)
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.notFound, "Account not found", undefined);
        const updatePayload = { isActivated: true };
        const updateResults = yield (0, _helpers_1.updateByID)(models_1.USERS, (_b = req === null || req === void 0 ? void 0 : req.token) === null || _b === void 0 ? void 0 : _b.id, updatePayload);
        _helpers_1.pusher.trigger("activateAccount", "activateAccount-event", {
            message: updateResults
        });
        /*
        if (webSocketServer) {
            webSocketServer.clients.forEach((client: any) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(updateResults));
                }
            });
        }
        */
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, "Account has been activated", updateResults);
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, JSON.stringify(error));
    }
});
exports.activatingAccount = activatingAccount;
//# sourceMappingURL=activatingAccount.ctrl.js.map