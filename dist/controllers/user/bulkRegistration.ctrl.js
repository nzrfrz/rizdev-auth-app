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
exports.bulkRegistration = void 0;
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
const bulkRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersData = req.body;
        if (usersData.length === 1 || usersData.length === undefined)
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Bulk create must have 2 or more objects", {});
        let resultsPool = [];
        for (let index = 0; index < usersData.length; index++) {
            const element = usersData[index];
            const data = Object.assign(Object.assign({}, element), { refreshToken: "", avatarColor: (0, _helpers_1.randomColorGenerator)(), avatarImage: {
                    id: "",
                    url: ""
                }, isActivated: false });
            const bulkCreateResults = yield (0, _helpers_1.bulkCreate)(models_1.USERS, data);
            resultsPool.push(bulkCreateResults);
        }
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, _helpers_1.message.onlySuccess, resultsPool);
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, JSON.stringify(error));
    }
});
exports.bulkRegistration = bulkRegistration;
//# sourceMappingURL=bulkRegistration.ctrl.js.map