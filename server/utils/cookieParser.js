const cookieParser = (req, res, next) => {
  const index = req.rawHeaders.indexOf("cookie");
  if (index === -1) {
    return null;
  }
  const raw = req.rawHeaders[index + 1].split("=");
  let i = 0;

  var result = {};

  while (i < raw.length) {
    result = { ...result, [raw[i]]: raw[i + 1] };
    console.log(result);
    i = i + 2;
  }

  req.cookies = result;

  next();
};

module.exports = { cookieParser };
