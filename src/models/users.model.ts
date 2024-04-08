// @ts-ignore
import mongoose, { Document, Model } from "mongoose";

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    userRole?: string;
    avatarColor?: string;
    avatarImage?: {
        id?: string,
        url?: string,
    };
    isActivated?: boolean;
    refreshToken?: string;
    updatedAt: string;
    createdAt: string;
};

const UserSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
);

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

export const USERS: Model<UserDocument> = mongoose.model<UserDocument>("users", UserSchema);