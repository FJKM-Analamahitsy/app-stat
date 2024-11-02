const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  password: String,
  role: String,
});

module.exports = { User };
