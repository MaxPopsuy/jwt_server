const bcrypt = require("bcrypt");
const passport = require("passport");
const { user } = require("../models");

exports.register = async (req, res, next) => {
  try {
    const { username, password, age, description } = req.body;
    const hashedPassword = await user.hashPassword(password);
    const findedUser = await user.findOne({ username });
    if (findedUser) {
      req.flash("message", "username is already taken");
      res.redirect("/register");
      return;
    }

    const newUser = await user.create({
      username,
      password: hashedPassword,
      age,
      description,
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.flash("message", error.message);
    res.redirect("/register");
  }
};
exports.login = async (req, res, next) => {
  passport.authenticate("local", (error, user) => {
    if (!user || error) {
      console.log(error);
      req.flash("message", error ? error.message : "Wrong credentials");
      res.redirect("/login");
      return;
    }
    req.logIn(user, (err) => {
      console.log(err);
      req.flash("message", err.message);
      res.redirect("/login");
      return;
    });
    res.redirect("/profile");
  })(req, res, next);
};
exports.getProfile = async (req, res, next) => {};
