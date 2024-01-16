const mongoose = require("mongoose");

const Member = mongoose.model("Member", {
  name: String,
  forname: String,
  birthday: Date,
  birthplace: String,
  gender: String,
  adress: String,
  city: String,
  place: String,
  job: String,
  talent: String,
  phone: String,
  mail: String,
  fb: String,
  hobby: String,
  baptism: Boolean,
  baptismYear: String,
  mpandray: Boolean,
  mpandrayAndiany: String,
  mpandrayN: String,
  family: {
    id: String,
    place: String,
    rank: Number,
  },
});

module.exports = { Member };
