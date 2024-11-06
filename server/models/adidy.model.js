const mongoose = require("mongoose");

const Adidy = mongoose.model("Adidy", {
  year: Number,
  month: [Number],
  mpandray: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
});

const Compta = mongoose.model("Compta", {
  createBy: String,
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdidyType",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mpandray: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  mtt: Number,
  month: [Number],
});

const AdidyType = mongoose.model("AdidyType", {
  name: String,
});

module.exports = { Adidy, Compta, AdidyType };
