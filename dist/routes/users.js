"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../contolles/usersController");
exports.router = express_1.default.Router();
function routes(passport) {
    exports.router.post("/login", (req, res, next) => {
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
            successRedirect: "/"
        })(req, res, next);
    });
    exports.router.get("/logout", ((req, res) => {
        req.logout();
        req.flash("success_msg", "Your are logged out.");
        res.redirect("/login");
    }));
    exports.router.post("/register", usersController_1.register);
}
exports.routes = routes;
//# sourceMappingURL=users.js.map