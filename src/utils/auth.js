const jwt = require("jsonwebtoken");

exports.generateToken = async (user, time) => {
  const payload = {
    _id: user._id,
  };
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: time,
  });
};
