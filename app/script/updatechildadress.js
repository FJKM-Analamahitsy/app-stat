require("dotenv").config();
const mongoose = require("mongoose");
const { Member } = require("../models/member.model");

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log("db connected");
  const members = await Member.find({
    home: { $exists: false },
    familyId: { $exists: true },
  });
  let n = 0;
  members.forEach(async (member) => {
    const adress = await Member.findOne({
      familyId: member.familyId,
      famHead: true,
    }).select("-_id home place");
    await Member.findOneAndUpdate({ _id: member._id }, { ...adress });
    n++;
  });
  console.log(n);
  console.log("updated");
});
