import bodyParser from "body-parser";
import flash from "connect-flash";
import dotenv from "dotenv";
import express from "express";
import {NextFunction, Request, Response} from "express";
import expressLayoutEjs from "express-ejs-layouts";
import session from "express-session";
import mongo from "mongodb";
import mongoose from "mongoose";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import * as path from "path";
import {passportConfig} from "./config/passport";
import {router as indexRouter} from "./routes/index";
import {router as usersRouter, routes} from "./routes/users";
import {sockets as socket} from "./sockets";

const app = express();

// initialize configuration
dotenv.config();

// passport config
passportConfig(passport);

// Database connection
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}` +
    `@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true`,
    { useNewUrlParser: true })
    .then(() => console.log("Mongo database connected."))
    .catch((err) => console.log(err));

// configure Express to use EJS
app.set("views", path.join( __dirname, "views" ));
app.use(expressLayoutEjs);
app.set("view engine", "ejs" );
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// Routes
app.use("/", indexRouter);
app.use("/", usersRouter);
routes(passport);

// set server port
app.set("port", process.env.SERVER_PORT || 8080);
// start the Express server
const server =
    app.listen(app.get("port"), () => {
    console.log(`Server is started on port ${app.get("port")}`);
});

// setup sockets
socket(server);
