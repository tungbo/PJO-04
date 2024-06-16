const runQuery = require("../server");

const getUser = async () => {
  const query = `SELECT * FROM "Account";`;
  const res = await runQuery(query);
  return res.rows;
};

const getUserByUsername = async (UserName) => {
  const query = `
    SELECT * FROM "Account" WHERE "UserName" = $1;
  `;
  const res = await runQuery(query, [UserName]);
  return res.rows[0];
};

const updateUser = async (idAccount, user) => {
  const { address, phone, Name, role } = user;

  const query = `UPDATE "Account" SET "address" = $1, "phone" = $2, "Name" = $3, "role" = $4 WHERE "idAccount" = $5 RETURNING *;`;
  const res = await runQuery(query, [address, phone, Name, role, idAccount]);
  return res.rows[0];
};

const deleteUser = async (idAccount) => {
  const query = `DELETE FROM "Account" WHERE "idAccount" = $1 RETURNING *;`;
  const res = await runQuery(query, [idAccount]);

  return res.rows[0];
};

module.exports = {
  getUser,
  getUserByUsername,
  updateUser,
  deleteUser,
};
