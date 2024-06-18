const { query } = require("express");
const runQuery = require("../server");

const createCart = async (cart) => {
  const { idAccount, idPiza, quantity, description } = cart;
  const query = `INSERT INTO "Cart" ("idAccount", "idPiza", "quantity", "description") VALUES ($1, $2, $3, $4) RETURNING *;`;
  const res = await runQuery(query, [idAccount, idPiza, quantity, description]);
  return res.rows[0];
};

const getCartByUserId = async (idAccount) => {
  const query = `SELECT "idCart", "imgPiza", "namePiza", "Price", "quantity", "description" FROM "Cart" 
                    JOIN "Piza" ON "Piza"."idPiza" = "Cart"."idPiza" 
                    JOIN "PizaSize" ON "Piza"."idSize" = "PizaSize"."idSize" 
                    WHERE "idAccount" = $1;`;
  const res = await runQuery(query, [idAccount]);
  return res.rows;
};

const updateCart = async (cart) => {
  const { quantity, description, idCart } = cart;
  const query = `UPDATE "Cart" SET "quantity" = $1, "description" = $2 WHERE "idCart" = $3 RETURNING *;`;
  const res = await runQuery(query, [quantity, description, idCart]);
  return res.rows[0];
};

const deleteCart = async (cart) => {
  const { idCart } = cart;
  const query = `DELETE FROM "Cart" WHERE "idCart" = $1 RETURNING *;`;
  const res = await runQuery(query, [idCart]);
  return res.rows[0];
};

const deleteCartOrder = async (cart) => {
  const { idAccount } = cart;
  const query = `DELETE FROM "Cart" WHERE "idAccount" = $1 RETURNING *;`;
  const res = await runQuery(query, [idAccount]);
  return res.rows[0];
};

module.exports = {
  createCart,
  getCartByUserId,
  updateCart,
  deleteCart,
  deleteCartOrder,
};
