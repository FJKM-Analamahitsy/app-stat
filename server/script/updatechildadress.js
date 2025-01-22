require("dotenv").config();
const mongoose = require("mongoose");
const { Member } = require("../models/member.model");

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log("db connected");
  const members = await Member.find({ famHead: true });
  members.forEach(async (member) => {
    await Member.updateMany(
      { familyId: member.familyId },
      { home: member.home, zone: member.zone, place: member.place }
    );
    console.log(member.familyId);
  });
  console.log("updated");
});
