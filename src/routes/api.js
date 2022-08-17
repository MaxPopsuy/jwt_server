const express = require("express");

const authRouter = require("./authRouter");
const usersRouter = require("./usersRouter");

const router = express.Router();

router.use("/", authRouter);
router.use("/favicon.ico", authRouter);
router.use("/user", usersRouter);

module.exports = router;
