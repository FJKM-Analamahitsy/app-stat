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
  date: {
    type: Date,
    default: Date.now,
  },
  mpandray: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  mtt: Number,
  note: String,
});

module.exports = { Adidy, Compta };
