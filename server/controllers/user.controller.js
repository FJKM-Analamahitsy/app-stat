const { User } = require("../models/user.model");
const { compare, hashPassword } = require("../utils/bcrypt");
const { object, string } = require("yup");
const jwt = require("jsonwebtoken");

const idSchema = object({
  id: string().required(),
});

const loginInput = object({
  username: string().required(),
  password: string().required(),
});

const userSchema = object({
  username: string().required(),
  password: string().required(),
  role: string().required(),
});

const createUser = async (req, res) => {
  try {
    const { password, ...user } = await userSchema.validate(req.body);
    const newUser = new User({
      password: await hashPassword(password),
      ...user,
    });
    await newUser.save();
    return res.send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = await idSchema.validate(req.body);
    const user = await User.findOneAndDelete({ _id: id });
    return res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, ...body } = await idSchema.validate(req.body);
    if (body.password) {
      body.password = await hashPassword(body.password);
    }
    await User.findOneAndUpdate({ _id: id }, { ...body });
    return res.send("sucess");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const listUser = async (req, res) => {
  const user = await User.find().select("username role");
  return res.send(user);
};

const login = async (req, res) => {
  try {
    const { password, username } = await loginInput.validate(req.body);
    const user = await User.findOne({ username });
    if (user) {
      const check = await compare(password, user.password);
      if (check) {
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

module.exports = { login, createUser, deleteUser, updateUser, listUser };
