"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const router = express_1.default.Router();
exports.default = () => {
    (0, user_route_1.default)(router);
    (0, auth_route_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map