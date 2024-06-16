const runQuery = require("../server");
const bcrypt = require("bcrypt");

register = async (user) => {
  const { UserName, Password, address, phone, Name, role = "U" } = user;
  const hashedPassword = await bcrypt.hash(Password, 10);
  const query = `
      INSERT INTO "Account" ("UserName", "Password", "address", "phone", "Name", "role")
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
  const res = await runQuery(query, [
    UserName,
    hashedPassword,
    address,
    phone,
    Name,
    role,
  ]);
  return res.rows[0];
};

module.exports = {
  register,
};
