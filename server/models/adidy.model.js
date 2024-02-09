const mongoose = require("mongoose");

const Adidy = mongoose.model("Adidy", {
  type: String,
  year: Number,
  month: Number,
  mpandray: String,
  pay: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { Adidy };
