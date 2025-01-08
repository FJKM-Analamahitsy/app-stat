const jwt = require("jsonwebtoken");
const authMiddlware = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.PRIVATE_KEY, (err, dec) => {
    if (err) return res.status(401).send("unauthorized");
    req.requester = dec.username;
    next();
  });
};

module.exports = { authMiddlware };
