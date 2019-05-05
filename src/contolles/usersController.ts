import bcrypt from "bcryptjs";
import {NextFunction, Request, Response} from "express";
import {User} from "../models/User";

interface IError {
    msg: string;
}

export function register(req: Request, res: Response) {
    const { username, email, password, password2 } = req.body;
    const errors: IError[] = [];

    // check required fields
    if (!username || !email || !password || !password2) {
        errors.push({msg: "Pleas fill all required fields"});
    }

    // check passwords match
    if (password !== password2) {
        errors.push({msg: "Passwords don't match"});
    }

    // check password length
    if (password.length < 6) {
        errors.push({msg: "Password mast be at lest 6 characters"});
    }

    // check username length
    if (username.length < 3) {
        errors.push({msg: "Username mast be at lest 3 characters"});
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
    } else {
        // check if user with that same email or username already exist
        User.findOne({ $or: [ {email}, {username}] })
            .then((user) => {
                if (user) {
                    // user already exist in database
                    errors.push({msg: "User with this email or username already exist!"});
                    res.render("register", {
                        email,
                        errors,
                        password,
                        password2,
                        username
                    });
                } else {
                    // hash password and create user
                    bcrypt.genSalt(10, (error, salt) =>
                        bcrypt.hash(password, salt, (err, hash) => {
                            // create user
                            new User({
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
