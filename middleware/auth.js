const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  const token = authorizationHeader;

  try {
    const decoded = jwt.verify(
      token,
      "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient permissions" });
    }
    next();
  };
};
module.exports = {
  auth,
  authorize,
};
