const { Profile } = require("../models/profile.model");

const getAllProfile = async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
};

const getProfile = async (req, res) => {
  const profiles = await Profile.findById(req.params.id);
  res.json(profiles);
};

const createProfile = async (req, res) => {
  try {
    const newProfile = new Profile({ ...req.body });
    await newProfile.save();
    return res.send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

const updateProfile = async (req, res) => {
  try {
    await Profile.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
    return res.send("sucess");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteProfile = async (req, res) => {
  try {
    const user = await Profile.findOneAndDelete({ _id: req.params.id });
    return res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile,
  getAllProfile,
};
