const mongoose = require("mongoose");

const Group = mongoose.model("Group", {
  name: {
    type: String,
    unique: true,
  },
});

module.exports = { Group };
