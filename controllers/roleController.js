const runQuery = require("../server");

const createRole = async (role) => {
  const { nameRole } = role;
  const query = `INSERT INTO "RoleManager" ("nameRole") VALUES ($1) RETURNING *;`;
  const res = await runQuery(query, [nameRole]);
  return res.rows[0];
};

const getRole = async () => {
  const query = `SELECT * FROM "RoleManager";`;
  const res = await runQuery(query);
  return res.rows;
};

const getRoleById = async (idRole) => {
  const query = `SELECT * FROM "RoleManager" WHERE "idRole" = $1;`;
  const res = await runQuery(query, [idRole]);
  return res.rows[0];
};

const updateRole = async (idRole, role) => {
  const { nameRole } = role;

  const query = `UPDATE "RoleManager" SET "nameRole" = $1 WHERE "idRole" = $2 RETURNING *;`;
  const res = await runQuery(query, [nameRole, idRole]);
  return res.rows[0];
};

// const deleteRole = async (idRole) => {
//   const query = `DELETE FROM "RoleManager" WHERE "idRole" = $1 RETURNING *;`;
//   const res = await runQuery(query, [idRole]);
//   return res.rows[0];
// };

module.exports = {
  createRole,
  getRole,
  getRoleById,
  updateRole,
};
