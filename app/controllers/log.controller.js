const { Log } = require("../models/log.model");

const log = async (user, content) => {
  const newLog = new Log({ user, content });
  await newLog.save();
};

module.exports = { log };
