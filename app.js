const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

// view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect(keys.mongoDB.dbURI, () => {
  console.log("connected to mongoDB");
});

// setup routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3004, () => {
  console.log("your auth app is running on port 3004");
});
