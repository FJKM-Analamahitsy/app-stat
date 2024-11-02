const mongoose = require("mongoose");

const Profile = mongoose.model("Profile", {
  name: {
    type: String,
    unique: true,
  },
  permission: {
    GET: [String],
    POST: [String],
    DELETE: [String],
    PATCH: [String],
  },
});

module.exports = { Profile };
