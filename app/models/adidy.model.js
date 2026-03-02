const mongoose = require("mongoose");

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
  year: Number,
  number: Number,
  culte: Number,
  part: Number,
});

const AdidyType = mongoose.model("AdidyType", {
  name: String,
});

module.exports = { Compta, AdidyType };
