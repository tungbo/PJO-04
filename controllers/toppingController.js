const runQuery = require("../server");

const createTopping = async (topping) => {
  const { nameTopping, Price } = topping;
  const query = `INSERT INTO "Toppings" ("nameTopping", "Price") VALUES ($1, $2) RETURNING *;`;
  const res = await runQuery(query, [nameTopping, Price]);
  return res.rows[0];
};

const getTopping = async () => {
  const query = `SELECT * FROM "Toppings";`;
  const res = await runQuery(query);
  return res.rows;
};

const getToppingById = async (idTopping) => {
  const query = `SELECT * FROM "Toppings" WHERE "idTopping" = $1;`;
  const res = await runQuery(query, [idTopping]);
  return res.rows[0];
};

const updateTopping = async (topping) => {
  const { nameTopping, Price, idTopping } = topping;

  const query = `UPDATE "Toppings" SET "nameTopping" = $1, "Price" = $2 WHERE "idTopping" = $3 RETURNING *;`;
  const res = await runQuery(query, [nameTopping, Price, idTopping]);
  return res.rows[0];
};

const deleteTopping = async (idTopping) => {
  const query = `DELETE FROM "Toppings" WHERE "idTopping" = $1 RETURNING *;`;
  const res = await runQuery(query, [idTopping]);

  return res.rows[0];
};

module.exports = {
  createTopping,
  getTopping,
  getToppingById,
  updateTopping,
  deleteTopping,
};
