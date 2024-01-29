const jwt = require("jsonwebtoken");
const authMiddlware = (req, res, next) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, process.env.PRIVATE_KEY, (err, dec) => {
    if (err) return res.status(401).send("Auth error");
    next();
  });
};

module.exports = { authMiddlware };
