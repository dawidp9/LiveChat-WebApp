import express, {NextFunction, Request, Response} from "express";
import * as auth from "../config/auth";

export const router = express.Router();

// // Welcome Page
// router.get( "/", ((req: Request, res: Response) =>  res.render("index")));

// Chat Page
router.get("/", auth.ensureAuthenticated, (req: Request, res: Response) =>  {
    res.render("chat", {
        username: req.user.username
    });
});

// Login Page
router.get("/login", auth.forwardAuthenticated, ((req: Request, res: Response) =>  res.render("login")));

// Register Page
router.get("/register", ((req: Request, res: Response) =>  res.render("register")));
