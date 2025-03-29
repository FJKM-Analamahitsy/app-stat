const { Adidy, Compta, AdidyType } = require("../models/adidy.model");
const { Member } = require("../models/member.model");
const { default: mongoose } = require("mongoose");
const dayjs = require("dayjs");

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

    //get nth compta
    const today = dayjs().set("hour", 5).toISOString();
    const number = await Compta.find({
      createBy: req.requester,
      date: { $gte: today },
    }).countDocuments();

    const compta = new Compta({
      ...req.body.compta,
      number: number + 1,
      createBy: req.requester,
    });
    await compta.save();
    await Member.findByIdAndUpdate(mpandray, { lastPayDate: new Date() });
    const result = await compta.populate("mpandray type");
    res.json(result);
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
  const { page = 1, limit = 1000, start, end, mpandray, creator } = req.query;
  let filter = {};
  if (start) {
    filter = {
      ...filter,
      date: {
        $gte: new Date(start),
      },
    };
  }

  if (end) {
    filter = {
      ...filter,
      date: {
        ...filter.date,
        $lte: new Date(end),
      },
    };
  }

  if (mpandray) {
    filter = { ...filter, mpandray: new mongoose.Types.ObjectId(mpandray) };
  }

  if (creator) {
    filter = { ...filter, createBy: creator };
  }

  let member = await Compta.aggregate([
    {
      $match: { ...filter },
    },
    {
      $sort: {
        date: -1,
      },
    },
    {
      $skip: (page - 1) * parseInt(limit),
    },
    {
      $limit: parseInt(limit),
    },
  ]);

  member = await Compta.populate(member, { path: "type" });
  member = await Compta.populate(member, { path: "mpandray" });

  const totalRow = await Compta.aggregate([
    {
      $match: { ...filter },
    },
    {
      $count: "mtt",
    },
  ]);
  const sum = await Compta.aggregate([
    {
      $match: { ...filter },
    },

    { $group: { _id: null, mtt: { $sum: "$mtt" } } },
  ]);
  return res.send({
    member,
    totalRow: totalRow.length > 0 ? totalRow[0].mtt : 0,
    sum: sum.length > 0 ? sum[0].mtt : 0,
  });
};

const getType = async (req, res) => {
  try {
    const type = await AdidyType.find();
    res.json(type);
  } catch (error) {
    res.status(400).send();
  }
};

const getComptaById = async (req, res) => {
  const result = await Compta.findById(req.params.id).populate("type mpandray");
  res.json(result);
};

const getMySummary = async (req, res) => {
  const pipeline = [
    {
      $project: {
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        createBy: "$createBy",
        mtt: "$mtt",
        type: "$type",
      },
    },
    {
      $match: { createBy: req.requester, date: dayjs().format("YYYY-MM-DD") },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        sum: { $sum: "$mtt" },
      },
    },
  ];
  const result = await Compta.aggregate([...pipeline]);

  res.json(result);
};

const getDailySummary = async (req, res) => {
  let match = { date: req.query.date };
  if (req.query.type) {
    match = { ...match, type: new mongoose.Types.ObjectId(req.query.type) };
  }
  const pipeline = [
    {
      $project: {
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        createBy: "$createBy",
        mtt: "$mtt",
        type: "$type",
      },
    },
    {
      $match: match,
    },
    {
      $group: {
        _id: {
          date: "$date",
          createBy: "$createBy",
          name: { $toLower: "$createBy" },
        },
        count: { $sum: 1 },
        sum: { $sum: "$mtt" },
      },
    },
    {
      $sort: { "_id.name": 1 }, // Trier après regroupement
    },
  ];
  const result = await Compta.aggregate([...pipeline]);
  const total = await Compta.aggregate([
    ...pipeline,
    {
      $group: {
        _id: null,
        count: { $sum: "$count" },
        sum: { $sum: "$sum" },
      },
    },
  ]);

  res.json([...result, ...total]);
};

const getAnnualySummary = async (req, res) => {
  const result = await Compta.aggregate([
    {
      $sort: {
        date: 1,
      },
    },
    {
      $project: {
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        year: { $dateToString: { format: "%Y", date: "$date" } },
        mtt: "$mtt",
      },
    },
    {
      $match: {
        year: req.query.year,
      },
    },
    {
      $group: {
        _id: {
          date: "$date",
        },
        count: { $sum: 1 },
        sum: { $sum: "$mtt" },
      },
    },
    {
      $sort: {
        "_id.date": 1,
      },
    },
  ]);

  res.json(result);
};

const getAllCreator = async (req, res) => {
  const result = await Compta.aggregate([
    {
      $group: {
        _id: {
          createBy: "$createBy",
          name: { $toLower: "$createBy" },
        },
      },
    },
    {
      $sort: { "_id.name": 1 },
    },
  ]);

  res.json(result);
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
  getComptaById,
  getAdidyTrace,
  getType,
  getDailySummary,
  getAnnualySummary,
  getAllCreator,
  getMySummary,
  createType,
  updateType,
  deleteType,
};
