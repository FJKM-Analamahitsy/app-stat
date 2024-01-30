const mongoose = require("mongoose");

const Member = mongoose.model("Member", {
  name: String,
  forname: String,
  birthday: Date,
  birthplace: String,
  gender: String,
  home: String,
  city: String,
  place: String,
  job: String,
  talent: String,
  phone: String,
  mail: String,
  fb: String,
  hobby: String,
  baptism: String,
  baptismYear: Number,
  mpandray: String,
  mpandrayAndiany: String,
  mpandrayN: Number,
  familyId: String,
  familyRank: Number,
  familyPlace: String,
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
