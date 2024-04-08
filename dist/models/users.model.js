"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS = void 0;
// @ts-ignore
const mongoose_1 = __importDefault(require("mongoose"));
;
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatarColor: String,
    avatarImage: {
        id: String,
        url: String
    },
    userRole: String,
    isActivated: Boolean,
    refreshToken: String,
}, {
    timestamps: true,
});
UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
exports.USERS = mongoose_1.default.model("users", UserSchema);
//# sourceMappingURL=users.model.js.map