const { User } = require("../models/user.model");
const { hashPassword } = require("../utils/bcrypt");
const { object, string } = require("yup");

const userSchema = object({
  username: string().required(),
  password: string().required(),
  profile: string().required(),
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
    console.log(error);
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    return res.send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { body } = req;
    if (body.password) {
      body.password = await hashPassword(body.password);
    }
    await User.findOneAndUpdate({ _id: req.params.id }, { ...body });
    return res.send("sucess");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUser = async (req, res) => {
  const user = await User.find().select("username").populate("profile");
  return res.send(user);
};

module.exports = { createUser, deleteUser, updateUser, getAllUser };
