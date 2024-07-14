const { query } = require("express");
const runQuery = require("../server");

const createCart = async (cart) => {
  const { idAccount, idPiza, quantity, description } = cart;
  const query = `INSERT INTO "Cart" ("idAccount", "idPiza", "quantity", "description") VALUES ($1, $2, $3, $4) RETURNING *;`;
  const res = await runQuery(query, [idAccount, idPiza, quantity, description]);
  return res.rows[0];
};
// Lay tat ca cac sp co trog cart
const getCartByUserId = async (idAccount) => {
  const query = `SELECT "idCart", "Piza"."idPiza", "imgPiza", "namePiza", "Price", "quantity", "description" FROM "Cart" 
                    JOIN "Piza" ON "Piza"."idPiza" = "Cart"."idPiza" 
                    JOIN "PizaSize" ON "Piza"."idSize" = "PizaSize"."idSize" 
                    WHERE "idAccount" = $1;`;
  const res = await runQuery(query, [idAccount]);
  return res.rows;
};

const updateInCart = async (cart) => {
  const { quantity, description, idCart, idPiza } = cart;
  const query = `UPDATE "Cart" SET "quantity" = $1, "description" = $2 WHERE "idCart" = $3 AND "idPiza" = $4 RETURNING *;`;
  const res = await runQuery(query, [quantity, description, idCart, idPiza]);
  return res.rows[0];
};

const updateCart = async (quantity, idAccount, idPiza) => {
  const query = `UPDATE "Cart" SET "quantity" = "quantity" + $1 WHERE "idAccount" = $2 AND "idPiza" = $3 RETURNING *;`;
  const res = await runQuery(query, [quantity, idAccount, idPiza]);
  return res.rows[0];
};

const checkCart = async (idAccount, idPiza) => {
  const query = `SELECT * FROM "Cart" WHERE "idAccount" = $1 AND "idPiza" = $2;`;
  const res = await runQuery(query, [idAccount, idPiza]);
  return res.rows.length > 0;
};

// Xoa sp
const deleteCart = async (cart) => {
  const { idCart } = cart;
  const query = `DELETE FROM "Cart" WHERE "idCart" = $1 RETURNING *;`;
  const res = await runQuery(query, [idCart]);
  return res.rows[0];
};
// Tao order thanh cong xoa cart
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
  checkCart,
  updateInCart,
};
