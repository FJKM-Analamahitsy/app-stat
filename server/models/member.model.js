const mongoose = require("mongoose");

const Member = mongoose.model("Member", {
  name: String,
  forname: String,
  fullname: String,
  birthday: String,
  gender: String,
  home: String,
  city: String,
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
  familyRank: {
    type: Number,
    default: 1,
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
