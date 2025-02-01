require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { auth } = require("./routes/auth");
const { member } = require("./routes/member");
const { adidy } = require("./routes/adidy");
const { cookieParser } = require("./utils/cookieParser");
const { profile } = require("./routes/profile");
const { users } = require("./routes/users");
const { diacre } = require("./routes/diacre");
const { authMiddlware } = require("./middleware/middleware");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser);
app.use("/auth", auth);
app.use("/member", authMiddlware, member);
app.use("/adidy", authMiddlware, adidy);
app.use("/profile", authMiddlware, profile);
app.use("/users", authMiddlware, users);
app.use("/diacre", authMiddlware, diacre);

const port = process.env.PORT || 4000;

const start = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("db connected successfuly");
      app.listen(port, () => console.log(`server is running on port ${port}`));
    })
    .catch((err) => {
      console.log(err);
    });
};

start();
