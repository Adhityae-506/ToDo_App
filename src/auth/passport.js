import passport, { Passport } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import bcrypt from "bcrypt";
import { db } from "../db/db.js";
import { users } from "../schema/users.js";
import { eq, and } from "drizzle-orm"; 

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (existingUser.length > 0) {
          return done(null, existingUser[0]);
        }

        const newUser = await db
          .insert(users)
          .values({
            name: profile.displayName,
            email,
            provider: "google",
          })
          .returning();

        return done(null, newUser[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(null, false, { message: "GitHub email not available" });
        }

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (existingUser.length > 0) {
          return done(null, existingUser[0]);
        }

        const newUser = await db
          .insert(users)
          .values({
            name: profile.username,
            email,
            provider: "github",
          })
          .returning();

        return done(null, newUser[0]);
      } catch (err) {
        return done(err, null);
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