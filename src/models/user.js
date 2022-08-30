const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 0,
      max: 150,
    },
    description: {
      type: String,
      maxLength: 255,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.validatePassword = function (rawPassword) {
  const hashedPassword = this.password;
  return bcrypt.compare(rawPassword, hashedPassword);
};

userSchema.statics.hashPassword = function (rawPassword) {
  return bcrypt.hash(rawPassword, 12);
};

module.exports = model("user", userSchema);
