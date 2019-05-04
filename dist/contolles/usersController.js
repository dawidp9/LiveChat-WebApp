"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
function register(req, res) {
    const { username, email, password, password2 } = req.body;
    const errors = [];
    // check required fields
    if (!username || !email || !password || !password2) {
        errors.push({ msg: "Pleas fill all required fields" });
    }
    // check passwords match
    if (password !== password2) {
        errors.push({ msg: "Passwords don't match" });
    }
    // check password length
    if (password.length < 6) {
        errors.push({ msg: "Password mast be at lest 6 characters" });
    }
    // check username length
    if (username.length < 3) {
        errors.push({ msg: "Username mast be at lest 3 characters" });
    }
    // check if there are any errors
    if (errors.length > 0) {
        res.render("register", {
            email,
            errors,
            password,
            password2,
            username
        });
    }
    else {
        // check if user with that same email or username already exist
        User_1.User.findOne({ $or: [{ email }, { username }] })
            .then((user) => {
            if (user) {
                // user already exist in database
                errors.push({ msg: "User with this email or username already exist!" });
                res.render("register", {
                    email,
                    errors,
                    password,
                    password2,
                    username
                });
            }
            else {
                // hash password and create user
                bcryptjs_1.default.genSalt(10, (error, salt) => bcryptjs_1.default.hash(password, salt, (err, hash) => {
                    // create user
                    new User_1.User({
                        email,
                        password: hash,
                        username
                    }).save()
                        .then(() => {
                        req.flash("success_msg", "Your account was created. Now you can login!");
                        res.redirect("/login");
                    })
                        .catch((errSave) => console.log(errSave));
                }));
            }
        })
            .catch((err) => console.log(err));
    }
}
exports.register = register;
//# sourceMappingURL=usersController.js.map