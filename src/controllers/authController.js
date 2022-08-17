const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { user } = require("../models");
const auth = require("../utils/auth")

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const findedUser = await user.findOne({
      username,
    });
    if (findedUser) {
      return res.status(422).send("Username is already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await user.create({
      ...req.body,
      password: hashedPassword,
    });
    const token = await auth.generateToken(createdUser, "15m");
    res.json({
      user: createdUser,
      token,
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

    const isPasswordValid = await bcrypt.compare(password, findedUser.password);
    if (!isPasswordValid) {
      return res.status(422).send("Wrong credentials");
    }
    const token = await auth.generateToken(findedUser, "15m");
    res.json({
      user: findedUser,
      token,
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
