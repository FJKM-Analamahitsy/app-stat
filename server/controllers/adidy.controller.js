const { object, string, number } = require("yup");
const { Adidy, Compta } = require("../models/adidy.model");

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const adidyInput = object({
  type: string().required(),
  year: number().required(),
  month: number().required(),
  mpandray: string().required(),
  pay: number().required(),
});

const createAdidy = async (req, res) => {
  try {
    const compta = new Compta(req.body.compta);
    await compta.save();
    const newAdidy = new Adidy(req.body.trace);
    await newAdidy.save();
    res.send("success");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteAdidy = async (req, res) => {
  if (!req.body.id) return res.status(404).send("id required");
  await Adidy.findByIdAndDelete(id);
  res.send("success");
};

const listAdidy = async (req, res) => {
  const { page = 1, limit = 2, id } = req.query;
  if (!id) return res.status(403).send("id required");
  const member = await Adidy.find({ mpandray: id })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const totalRow = await Adidy.find({ mpandray: id }).countDocuments();
  return res.send({ member, totalRow });
};

const adidympandray = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(403).send("id required");
  const result = await Adidy.find({
    mpandray: id,
    type: "adidy mpandray",
  }).select("month year -_id");
  return res.send(result);
};

module.exports = { createAdidy, deleteAdidy, listAdidy, adidympandray };
