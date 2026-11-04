const jwt = require("jsonwebtoken");
const { log } = require("./log.controller");
const { object, string } = require("yup");
const { Member } = require("../models/member.model");

const loginInput = object({
  username: string().required(),
  password: string().required(),
});

const getMe = async (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.PRIVATE_KEY, async (err, dec) => {
    if (err) return res.status(401).send("unauthorised");
    const user = await Member.findById(dec.id).populate("profile");
    return res.send(user);
  });
};

const login = async (req, res) => {
  try {
    const { password, username } = await loginInput.validate(req.body);
    const user = await Member.findOne({ password, username });
    if (user) {
      log(user.username, "connection");
      const token = jwt.sign(
        { username: user.fullname, id: user._id },
        process.env.PRIVATE_KEY
      );
      return res.send({
        token,
      });
    } else {
      return res.status(401).send("user does not exist!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.send("logout");
};

module.exports = { getMe, login, logout };
