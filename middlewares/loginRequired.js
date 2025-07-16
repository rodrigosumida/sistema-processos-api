const jwt = require("jsonwebtoken");

const loginRequired = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: "Login required" });

  const [, token] = authorization.split(" ");

  try {
    const userData = jwt.verify(token, "adwdakhwiugbaiyeba2yuvb2e2a2a");
    req.userData = userData;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid/expired token" });
  }
};

module.exports = loginRequired;
