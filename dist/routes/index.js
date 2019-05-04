"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth = __importStar(require("../config/auth"));
exports.router = express_1.default.Router();
// // Welcome Page
// router.get( "/", ((req: Request, res: Response) =>  res.render("index")));
// Chat Page
exports.router.get("/", auth.ensureAuthenticated, (req, res) => {
    res.render("chat", {
        username: req.user.username
    });
});
// Login Page
exports.router.get("/login", auth.forwardAuthenticated, ((req, res) => res.render("login")));
// Register Page
exports.router.get("/register", ((req, res) => res.render("register")));
//# sourceMappingURL=index.js.map