const mongoose = require("mongoose");

const Attendance = mongoose.Model("Attendance", {
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { Attendance };
