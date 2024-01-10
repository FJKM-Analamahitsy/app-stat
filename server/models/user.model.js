const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
});

module.exports = { User };
