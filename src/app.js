const express = require("express");
const volleyball = require("volleyball");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRouter = require("./routes/api");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

app.use(express.json());
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/api/v1/", apiRouter);

app.use(errorHandler);

module.exports = app;
