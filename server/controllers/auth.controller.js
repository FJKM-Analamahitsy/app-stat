const jwt = require("jsonwebtoken");
const getMe = async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.PRIVATE_KEY, (err, dec) => {
    if (err) return res.status(401);
    return res.send(dec);
  });
};

module.exports = { getMe };
