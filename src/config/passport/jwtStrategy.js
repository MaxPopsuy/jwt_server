const { ExtractJwt, Strategy } = require("passport-jwt");
const { user } = require("../../models");

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const findedUser = await user.findById(payload._id);
      if (!findedUser) {
        return done(null, false);
      }

      return done(null, findedUser);
    } catch (error) {
      return done(error, false);
    }
  }
);
module.exports = jwtStrategy;
