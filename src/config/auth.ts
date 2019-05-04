import {NextFunction, Request, Response} from "express";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    // req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/login");
}

export function forwardAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}
