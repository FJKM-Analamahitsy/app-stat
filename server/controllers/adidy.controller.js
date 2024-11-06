const { Adidy, Compta, AdidyType } = require("../models/adidy.model");
const { Member } = require("../models/member.model");

const createAdidy = async (req, res) => {
  try {
    const { mpandray, year } = req.body.trace;
    const check = await Adidy.findOne({ mpandray, year });
    if (check) {
      await check.updateOne({
        month: [...check.month, ...req.body.trace.month],
      });
    } else {
      const newAdidy = new Adidy(req.body.trace);
      await newAdidy.save();
    }
    const compta = new Compta({ ...req.body.compta, createBy: req.requester });
    await compta.save();
    await Member.findByIdAndUpdate(mpandray, { lastPayDate: new Date() });
    res.send("success");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAdidyTrace = async (req, res) => {
  try {
    const result = await Adidy.find({ mpandray: req.params.id })
      .sort({
        year: "desc",
      })
      .limit(4);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteAdidy = async (req, res) => {
  if (!req.params.id) return res.status(404).send("id required");
  const adidy = await Compta.findByIdAndDelete(req.params.id);
  const trace = await Adidy.findOne({
    mpandray: adidy.mpandray,
    year: adidy.year,
  });

  await trace.updateOne({
    month: trace.month.filter((v) => !adidy.month.includes(v)),
  });
  res.send();
};

const getCompta = async (req, res) => {
  const { page = 1, limit = 2, ...filter } = req.query;
  const member = await Compta.find({ ...filter })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ date: "desc" })
    .populate("type mpandray");
  const totalRow = await Compta.find({ ...filter }).countDocuments();
  return res.send({ member, totalRow });
};

const getType = async (req, res) => {
  try {
    const type = await AdidyType.find();
    res.json(type);
  } catch (error) {
    res.status(400).send();
  }
};

const createType = async (req, res) => {
  try {
    const type = new AdidyType({ ...req.body });
    await type.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
};

const updateType = async (req, res) => {
  try {
    await AdidyType.findByIdAndUpdate(req.params.id, { ...req.body });
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
};

const deleteType = async (req, res) => {
  try {
    const type = new AdidyType({ ...req.body });
    await AdidyType.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
};

module.exports = {
  createAdidy,
  deleteAdidy,
  getCompta,
  getAdidyTrace,
  getType,
  createType,
  updateType,
  deleteType,
};
