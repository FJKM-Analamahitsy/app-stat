const { Profile } = require("../models/profile.model");

const createProfile = async (req, res) => {
  try {
    console.log(req.body);
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
    const { body } = req.body;
    await Profile.findOneAndUpdate({ _id: req.params.id }, { ...body });
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

module.exports = { createProfile, updateProfile, deleteProfile };
