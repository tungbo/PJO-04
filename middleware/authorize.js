const authorize = (roles = []) => {
  // roles param can be a single role string (e.g., 'Admin') or an array of roles (e.g., ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user || (roles.length && !roles.includes(req.user.role))) {
      // User's role is not authorized
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = authorize;
