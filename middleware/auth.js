const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// const auth = (req, res, next) => {
//   const authorizationHeader = req.headers.authorization;

//   if (!authorizationHeader) {
//     return res.status(401).json({ message: "You are not logged in" });
//   }

//   const token = authorizationHeader;

//   try {
//     const decoded = jwt.verify(
//       token,
//       "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong"
//     );
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };
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
// Middleware xác thực JWT
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong"
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  authorize,
  authenticateJWT,
};
