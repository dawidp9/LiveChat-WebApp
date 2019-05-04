import express from "express";
import {NextFunction, Request, Response} from "express";
import {register} from "../contolles/usersController";

export const router = express.Router();
export function routes(passport: any) {
    router.post("/login", (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
            successRedirect: "/"
        })(req, res, next); });

    router.get("/logout", ((req, res) => {
            req.logout();
            req.flash("success_msg", "Your are logged out.");
            res.redirect("/login");
    }));

    router.post("/register", register);
}
