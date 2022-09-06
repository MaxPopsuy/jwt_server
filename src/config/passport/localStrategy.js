const { Strategy } = require("passport-local");
const { user } = require("../../models");

module.exports = new Strategy(
  {
    usernameField: "username",
  },
  async (username, password, done) => {
    try {
      const findedUser = await user.findOne({ username });
      if (!user || !(await user.validatePassword(password))) {
        done(null, false);
        return;
      }
      done(null, user);
      return;
    } catch (error) {
      return done(error);
    }
  }
);
