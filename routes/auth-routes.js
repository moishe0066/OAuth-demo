const router = require("express").Router();
const passport = require("passport");

// auth logout
router.get("/logout", (req, res) => {
  // handling with passport
  req.logOut();
  res.redirect("/");
});

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  //   res.send(req.user);
  res.redirect("/profile");
});

module.exports = router;
