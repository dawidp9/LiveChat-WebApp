import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import {Strategy as LocalStrategy} from "passport-local";
import {User, UserSchema} from "../models/User";

export function passportConfig(passport: any) {
    passport.use(
        new LocalStrategy({ usernameField: "username"}, (username, password, done) => {
            // match user
            User.findOne({username})
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: "Account with this username doesn't exist."});
                    }

                    // check password
                    bcrypt.compare(password, (user as any).password, (error: Error, isMatch: boolean) => {
                        if (error) { throw  error; }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {message: "Password is incorrect."});
                        }
                    });
                })
                .catch((err) => console.log(err));
        })
    );

    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: any, done: any) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

}
