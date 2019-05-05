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
const body_parser_1 = __importDefault(require("body-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const path = __importStar(require("path"));
const passport_2 = require("./config/passport");
const index_1 = require("./routes/index");
const users_1 = require("./routes/users");
const sockets_1 = require("./sockets");
const app = express_1.default();
// initialize configuration
dotenv_1.default.config();
// passport config
passport_2.passportConfig(passport_1.default);
// Database connection
mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}` +
    `@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })
    .then(() => console.log("Mongo database connected."))
    .catch((err) => console.log(err));
// configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.use(express_ejs_layouts_1.default);
app.set("view engine", "ejs");
app.use(express_1.default.static(path.join(__dirname, "public")));
// Body parser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Express session
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));
// Passport middleware
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Connect flash
app.use(connect_flash_1.default());
// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});
// Routes
app.use("/", index_1.router);
app.use("/", users_1.router);
users_1.routes(passport_1.default);
// set server port
app.set("port", process.env.SERVER_PORT || 8080);
// start the Express server
const server = app.listen(app.get("port"), () => {
    console.log(`Server is started on port ${app.get("port")}`);
});
// setup sockets
sockets_1.sockets(server);
//# sourceMappingURL=app.js.map