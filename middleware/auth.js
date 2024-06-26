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
    if (!req.user || !roles.includes(req.user.role)) {
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
  const RefreshToken = req.cookies.refeshToken;
   // if (!token) {
  //   return res.status(403).json({ message: "No token provided" });
  // }

 
    // const decoded = jwt.verify(
    //   token,
    //   "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong"
    // );

    jwt.verify(
      token,
      "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong",
      async (err, user) => {
        if (err) {
          if (!RefreshToken) {
            return res.status(403).json({ message: "No token provided" }); // Khong co token
          }
          try {
            jwt.verify(
              RefreshToken,
              "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong",
              (err, user) => {
                if (err) {
                  return res
                    .status(403)
                    .json({ message: "RefreshToken khoong co" });
                }
                const newAccessToken = jwt.sign(
                  { idAccount: user.idAccount, role: user.role },
                  "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong",
                  {
                    expiresIn: "1h",
                  }
                );
                res.cookie("token", newAccessToken, {
                  httpOnly: true,
                  secure:true,
                  sameSite: "strict",
                  maxAge:3600000
                })
                req.user = { idAccount: user.idAccount, role: user.role };
                next();
              }
            );
          } catch (error) {
            return res.status(500); // Lỗi máy chủ
          }
        }else{
          req.user = user;
          next();
        }
       
      }
    );

};

module.exports = {
  authorize,
  authenticateJWT,
};
