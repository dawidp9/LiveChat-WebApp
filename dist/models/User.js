"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserSchema = new mongoose_1.default.Schema({
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
exports.User = mongoose_1.default.model("User", exports.UserSchema);
//# sourceMappingURL=User.js.map