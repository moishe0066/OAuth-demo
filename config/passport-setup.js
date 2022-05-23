const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("profile from google", profile);
      //  check if user already exists
      User.findOne({
        googleid: profile.id,
      }).then((currentUser) => {
        if (currentUser) {
          console.log("current user", currentUser);
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            googleid: profile.id,
            thumbnail: profile._json.picture
              ? profile._json.picture
              : "there is no image to display",
          })
            .save()
            .then((newUser) => {
              console.log("new user created", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
