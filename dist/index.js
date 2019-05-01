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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const app = express_1.default();
// initialize configuration
dotenv_1.default.config();
// configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/api/*", (req, res) => {
    res.send("Hello from API GET /api/*");
});
// set server port
app.set("port", process.env.SERVER_PORT || 8080);
// start the Express server
app.listen(app.get("port"), () => {
    console.log(`Server is started on port ${app.get("port")}`);
});
//# sourceMappingURL=index.js.map