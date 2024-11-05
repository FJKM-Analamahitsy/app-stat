require("dotenv").config();
const mongoose = require("mongoose");

const { Profile } = require("./models/profile.model");
const { User } = require("./models/user.model");
const { hashPassword } = require("./utils/bcrypt");
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("db connected");
  const profile = new Profile({
    name: "admin",
    permission: {
      GET: ["dash", "profile", "users"],
    },
  });
  profile.save().then(async (doc) => {
    const admin = new User({
      username: "admin",
      password: await hashPassword("adM123"),
      profile: doc._id,
    });
    await admin.save();
    console.log("install done");
  });
});
