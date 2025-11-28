const jwt = require("jsonwebtoken");
const UnathorizedError = require("../errors/unathorized-err");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new UnathorizedError("Autorização Necessária primeira etapa");
  }
  const token = authorization.replace("Bearer", "").trim();
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (error) {
    throw new UnathorizedError("Autorização Necessária segunda etapa");
  }
  req.user = payload;
  return next();
};
