const mongoose = require("mongoose");

const Member = mongoose.model("Member", {
  name: String,
  forname: String,
  fullname: String,
  birthday: String,
  gender: String,
  home: String,
  place: String,
  talent: String,
  phone: String,
  mail: String,
  fb: String,
  hobby: String,
  sport: String,
  baptism: String,
  baptismYear: Number,
  mpandray: String,
  mpandrayAndiany: String,
  mpandrayN: String,
  familyId: Number,
  sampana: String,
  famHead: Boolean,
  status: {
    type: Boolean,
    default: true,
  },
  statusNote: String,
  familyRank: {
    type: Number,
    default: 1,
  },
  lastPayDate: {
    type: Date,
    default: Date.now,
  },
  familyPlace: String,
  other: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_update: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { Member };
