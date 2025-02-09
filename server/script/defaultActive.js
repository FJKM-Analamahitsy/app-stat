require("dotenv").config();
const mongoose = require("mongoose");
const { Member } = require("../models/member.model");

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log("db connected");
  const members = await Member.find({ famHead: true });
  members.forEach(async (member) => {
    console.log(member.status);
  });
  console.log("updated");
});
