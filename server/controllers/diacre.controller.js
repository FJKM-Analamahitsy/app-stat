const { Member } = require("../models/member.model");

const getList = async (req, res) => {
  const { sampana, ...cfil } = req.query;
  let filter = { ...cfil, sampana: { $regex: new RegExp("DIAKONA|FLD", "i") } };
  if (sampana) {
    filter = { ...filter, sampana: { $regex: new RegExp(sampana, "i") } };
  }
  const member = await Member.find()
    .where({ ...filter })
    .sort({ zone: "asc" });
  return res.send(member);
};

const getCoordinates = async (req, res) => {
  const result = await Member.aggregate([
    {
      $match: {
        "location.type": { $exists: true },
      },
    },
    {
      $group: {
        _id: [
          { $arrayElemAt: ["$location.coordinates", 0] },
          { $arrayElemAt: ["$location.coordinates", 1] },
        ],
        diakona: { $push: { _id: "$_id", fullname: "$fullname" } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 }, // Optional: sort by count
    },
  ]);

  res.json(result);
};

module.exports = { getCoordinates, getList };
