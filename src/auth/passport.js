import passport, { Passport } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { db } from "../db/db.js";
import { users } from "../schema/users.js";
import { eq } from "drizzle-orm";

passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
            try {
                const result = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email));
                const user = result[0];

                if (!user) {
                    return done(null, false, { message: "Invalid email! Check your credentials again." });
                }

                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return done(null, false, { message: "Incorrect password! Check your credentials again." });
                }

                return done(null, user);
            } catch (err) {
                return done(err)
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const result = await db 
            .select()
            .from(users)
            .where(eq(users.id, id));
        done(null, result[0]);
    }catch(err){
        done(err);
    }
});

export default passport;