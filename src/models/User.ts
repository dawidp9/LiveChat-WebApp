import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    date: {
        default: Date.now,
        type: Date
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    }
});

export const User = mongoose.model("User", UserSchema);
