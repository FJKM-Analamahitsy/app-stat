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
const { printer } = require("./routes/printer");
const { sms } = require("./routes/sms");
const { authMiddlware } = require("./middleware/middleware");
const path = require("path");
const { attendance } = require("./routes/attendance");
const route = express.Router();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser);
route.use("/auth", auth);
route.use("/member", authMiddlware, member);
route.use("/adidy", authMiddlware, adidy);
route.use("/profile", authMiddlware, profile);
route.use("/users", authMiddlware, users);
route.use("/diacre", authMiddlware, diacre);
route.use("/printer", authMiddlware, printer);
route.use("/attendance", authMiddlware, attendance);
route.use("/sms", authMiddlware, sms);
app.use("/api", route);

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

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
