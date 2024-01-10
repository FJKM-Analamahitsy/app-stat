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
  batisa: {
    status: Boolean,
    year: Number,
  },
  mpandray: {
    status: Boolean,
    andiany: String,
    karatra: Number,
  },
  family: {
    id: String,
    place: String,
    rank: Number,
  },
});

module.exports = { Member };
