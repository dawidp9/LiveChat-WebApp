"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_local_1 = require("passport-local");
const User_1 = require("../models/User");
function passportConfig(passport) {
    passport.use(new passport_local_1.Strategy({ usernameField: "username" }, (username, password, done) => {
        // match user
        User_1.User.findOne({ username })
            .then((user) => {
            if (!user) {
                return done(null, false, { message: "Account with this username doesn't exist." });
            }
            // check password
            bcryptjs_1.default.compare(password, user.password, (error, isMatch) => {
                if (error) {
                    throw error;
                }
                if (isMatch) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: "Password is incorrect." });
                }
            });
        })
            .catch((err) => console.log(err));
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User_1.User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
exports.passportConfig = passportConfig;
//# sourceMappingURL=passport.js.map