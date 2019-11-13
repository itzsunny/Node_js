var passport = require("passport");
var GithubStrategy = require("passport-github").Strategy;
var User = require("../models/user");

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) return cb(null, false);
        if (!user) {
          var user = {
            name: profile.displayName,
            email: profile._json.email,
            profile: profile._json.avatar_url
          };
          User.create(user, (err, user) => {
            if (err) return cb(null, false);
            cb(null, user);
          });
        }
        cb(null, user);
      });
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) return cb(err, false);
    cb(null, user);
  });
});
