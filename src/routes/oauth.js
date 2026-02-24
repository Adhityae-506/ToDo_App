import express from "express";
import passport from "../auth/passport.js";

const router = express.Router();

// GOOGLE
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

// GITHUB
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

export default router;