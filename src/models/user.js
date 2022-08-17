const { Schema, model } = require("mongoose");

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

module.exports = model("user", userSchema);
