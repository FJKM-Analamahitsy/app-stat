const { Member } = require("../models/member.model");
const { Compta } = require("../models/adidy.model");

const statistics = async (req, res) => {
  let raw = await Member.aggregate([
    {
      $facet: {
        total: [{ $match: { status: true } }, { $count: "id" }],
        home: [
          { $match: { familyId: { $exists: true }, status: true } },
          { $group: { _id: "$familyId" } },
          { $count: "id" },
        ],
        mpandray: [
          { $match: { status: true, mpandray: "eny" } },
          { $count: "id" },
        ],
        batisa: [
          { $match: { status: true, baptism: "eny" } },
          { $count: "id" },
        ],
        registered: [
          { $match: { status: true, familyId: { $exists: true } } },
          { $count: "id" },
        ],
        sheep: [
          { $match: { status: true, zone: { $exists: true } } },
          { $count: "id" },
        ],
        gender: [
          { $match: { status: true } },
          { $group: { _id: "$gender", count: { $sum: 1 } } },
        ],
        mpandray_categ_1: [
          {
            $match: {
              status: true,
              familyRank: { $lte: 2 },
              mpandray: "eny",
              familyId: { $exists: true },
            },
          },
          { $count: "id" },
        ],
        mpandray_categ_2: [
          {
            $match: { status: true, familyRank: { $gt: 2 }, mpandray: "eny" },
          },
          { $count: "id" },
        ],
        mpandray_categ_3: [
          {
            $match: { status: true, mpandray: "hafa" },
          },
          { $count: "id" },
        ],
        region: [
          { $match: { status: true } },
          { $group: { _id: "$place", count: { $sum: 1 } } },
        ],
      },
    },
  ]);
  raw = raw[0];

  let stats = {};
  const numfields = [
    "total",
    "mpandray",
    "batisa",
    "home",
    "mpandray_categ_1",
    "mpandray_categ_2",
    "mpandray_categ_3",
    "registered",
    "sheep",
  ];
  Object.keys(raw).forEach((v) => {
    if (numfields.indexOf(v) === -1) {
      let item = raw[v].reduce((acc, cur) => {
        acc[cur._id] = cur.count;
        return acc;
      }, {});

      stats[v] = item;
    } else {
      stats[v] = raw[v].length > 0 ? raw[v][0].id : 0;
    }
  });
  res.send(stats);
};

const statPerBirthMonth = async (req, res) => {
  const month = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];
  let result = {};
  for (let i = 0; i < month.length; i++) {
    const m = month[i];
    const count = await Member.where({ birthday: m }).countDocuments();
    result = { ...result, [m]: count };
  }

  return res.json(result);
};

const statPerSampana = async (req, res) => {
  const sampana = [
    "AFA",
    "SAFIF",
    "AMA",
    "ANTEMA",
    "VODROM-BAVAKA",
    "MAINTIMOLALY",
    "SEKOLY_ALAHADY",
    "SFS",
    "SAMPATI",
    "SVM",
    "VFL",
    "AFF",
    "CENTRE_MEDICAL",
    "SLK",
    "STK_MOZIKA",
    "ENGLISH_CLUB",
    "VSMAM",
    "DORKASY",
    "FLD",
    "KATEKOMENA",
    "DIAKONA",
    "STK",
    "GMMC",
    "ZOKIOLONA",
  ].sort();
  let result = {};
  for (let i = 0; i < sampana.length; i++) {
    const m = sampana[i];
    const count = await Member.where({
      sampana: { $regex: new RegExp(m, "i") },
    }).countDocuments();
    result = { ...result, [m]: count };
  }

  return res.json(result);
};

const offeringStatus = async (req, res) => {
  const { year = new Date().getFullYear() } = req.query;
  const base = [
    {
      $match: { year },
    },
    {
      $unwind: "$month",
    },
    {
      $group: {
        _id: {
          year: "$year",
          mpandray: "$mpandray",
        },
        months: { $addToSet: "$month" },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        mpandray: "$_id.mpandray",
        months: {
          $sortArray: {
            input: "$months",
            sortBy: 1,
          },
        },
        percentage: {
          $multiply: [{ $divide: [{ $size: "$months" }, 12] }, 100],
        },
      },
    },
  ];
  const d = await Compta.aggregate([
    {
      $facet: {
        mean: [
          ...base,
          {
            $group: {
              _id: "$year",
              meanPercentage: { $avg: "$percentage" },
              totalUsers: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: { $round: ["$meanPercentage", 2] },
            },
          },
        ],
        fullpaid: [
          ...base,
          {
            $match: {
              percentage: 100,
            },
          },
          {
            $count: "id",
          },
        ],
      },
    },
  ]);

  return res.json(d);
};

module.exports = {
  statistics,
  statPerBirthMonth,
  statPerSampana,
  offeringStatus,
};
