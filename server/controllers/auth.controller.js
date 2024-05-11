const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const { log } = require("./log.controller");
const { object, string } = require("yup");
const { compare } = require("../utils/bcrypt");

const loginInput = object({
  username: string().required(),
  password: string().required(),
});

const getMe = async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.PRIVATE_KEY, (err, dec) => {
    if (err) return res.status(401);
    return res.send(dec);
  });
};

const login = async (req, res) => {
  try {
    const { password, username } = await loginInput.validate(req.body);
    const user = await User.findOne({ username });
    if (user) {
      const check = await compare(password, user.password);
      if (check) {
        log(user.username, "connection");
        const token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.PRIVATE_KEY
        );
        res.cookie("token", token, {
          httpOnly: true,
          domain: "localhost",
          maxAge: 5 * 3600 * 1000,
        });
        return res.send({
          token: jwt.sign(
            { username: user.username, role: user.role },
            process.env.PRIVATE_KEY
          ),
        });
      } else {
        return res.status(401).send("Wrong password!");
      }
    } else {
      return res.status(401).send("user does not exist!");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.send("logout");
};

module.exports = { getMe, login, logout };
