const mongoose = require("mongoose");

const Attendance = mongoose.model("Attendance", {
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { Attendance };
