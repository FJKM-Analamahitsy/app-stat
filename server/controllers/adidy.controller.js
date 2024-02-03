const { object, string, number } = require("yup");
const { Adidy } = require("../models/adidy.model");

const adidyInput = object({
  type: string().required(),
  year: number().required(),
  month: number().required(),
  mpandray: string().required(),
  pay: number().required(),
});

const createAdidy = async (req, res) => {
  try {
    const input = await adidyInput.validate(req.body);
    const newAdidy = new Adidy({ ...input });
    await newAdidy.save();
    res.send("success");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteAdidy = async (req, res) => {
  if (!req.body.id) res.status(404).send("id required");
  const adidy = await Adidy.findByIdAndDelete(id);
  res.send("success");
};

module.exports = { createAdidy, deleteAdidy };
