const passport = require("passport");

const { user } = require("../../models");

const jwtStrategy = require("./jwtStrategy");
const localStrategy = require("./localStrategy");

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (userId, done) => {
  try {
    const findedUser = await user.findById(userId);
    done(null, findedUser);
  } catch (error) {}
});

// passport.use(jwtStrategy);
passport.use(localStrategy);
