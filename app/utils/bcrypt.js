const bcrypt = require("bcrypt");

const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

const compare = async (client_secret, server_secret) => {
  return await bcrypt.compare(client_secret, server_secret);
};

module.exports = { hashPassword, compare };
