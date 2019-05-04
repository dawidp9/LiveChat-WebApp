"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/login");
}
exports.ensureAuthenticated = ensureAuthenticated;
function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}
exports.forwardAuthenticated = forwardAuthenticated;
//# sourceMappingURL=auth.js.map