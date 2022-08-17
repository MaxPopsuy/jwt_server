const jwt = require("jsonwebtoken");
const { user } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Unauthorized");
    }
    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const findedUser = await user.findById(decoded._id);
    if (!findedUser) {
      return res.status(401).send("Unauthorized");
    }
    req.user = findedUser;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};
