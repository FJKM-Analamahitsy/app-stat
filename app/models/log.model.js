const mongoose = require("mongoose");

const Log = mongoose.model("Log", {
  date: {
    type: Date,
    default: Date.now,
  },
  user: String,
  content: String,
});

module.exports = { Log };
