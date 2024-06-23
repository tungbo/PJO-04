const runQuery = require("../server");

const createSize = async (size) => {
  const { NameSize, Price } = size;
  const query = `INSERT INTO "PizaSize" ("NameSize", "Price") VALUES ($1, $2) RETURNING *;`;
  const res = await runQuery(query, [NameSize, Price]);
  return res.rows[0];
};

const getSizes = async () => {
  const query = `SELECT * FROM "PizaSize";`;
  const res = await runQuery(query);
  return res.rows;
};

const getSizeById = async (idSize) => {
  const query = `SELECT * FROM "PizaSize" WHERE "idSize" = $1;`;
  const res = await runQuery(query, [idSize]);
  return res.rows[0];
};

const updateSize = async (size) => {
  const { idSize, NameSize, Price } = size;

  const query = `UPDATE "PizaSize" SET "NameSize" = $1, "Price" = $2 WHERE "idSize" = $3 RETURNING *;`;
  const res = await runQuery(query, [NameSize, Price, idSize]);
  return res.rows[0];
};

const deleteSize = async (idSize) => {
  const query = `DELETE FROM "PizaSize" WHERE "idSize" = $1 RETURNING *;`;
  const res = await runQuery(query, [idSize]);

  return res.rows[0];
};

module.exports = {
  createSize,
  getSizes,
  getSizeById,
  updateSize,
  deleteSize,
};
