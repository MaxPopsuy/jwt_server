const bcrypt = require("bcrypt");
const { user } = require("../models");
const auth = require("../utils/auth");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    auth.isExistent(user, username, res);

    const hashedPassword = await user.hashPassword(password);

    const createdUser = await user.create({
      ...req.body,
      password: hashedPassword,
    });
    res.json({
      user: createdUser,
      token: await auth.generateToken(createdUser, "30m"),
    });
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const findedUser = await user.findOne({
      username,
    });
    if (!findedUser) {
      return res.status(422).send("Wrong credentials");
    }

    const isPasswordValid = await findedUser.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(422).send("Wrong credentials");
    }
    res.json({
      user: findedUser,
      token: await auth.generateToken(findedUser, "30m"),
    });
  } catch (error) {
    next(error);
  }
};
exports.getProfile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};
