const { Member } = require("../models/member.model");

const getCoordinates = async (req, res) => {
  const result = await Member.aggregate([
    {
      $match: {
        "location.type": { $exists: true },
        sampana: new RegExp("DIAKONA", "i"), // Filter for the specific place
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

module.exports = { getCoordinates };
