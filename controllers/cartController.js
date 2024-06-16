const runQuery = require("../server");

const createCart = async (cart) => {
  const { idAccount, idPiza, quantity = 1, description } = cart;
  const query = `INSERT INTO "Cart" ("idAccount", "idPiza", "quantity", "description") VALUES ($1, $2, $3) RETURNING *;`;
  const res = await runQuery(query, [idAccount, idPiza, description]);
  return res.rows[0];
};

const getCartByUserId = async (idAccount) => {
  const query = `SELECT "imgPiza", "namePiza", "Price", "quantity", "description" FROM "Cart" 
                    JOIN "Piza" ON "Piza"."idPiza" = "Cart"."idPiza" 
                    JOIN "PizaSize" ON "Piza"."idSize" = "PizaSize"."idSize" 
                    WHERE "idAccount" = $1;`;
  const res = await runQuery(query, [idAccount]);
  return res.rows;
};

const updateCart = async (cart) => {
  const { idCart, quantity } = cart;

  const query = `UPDATE "Cart" SET "quantity" = $1 WHERE "idCart" = $2 RETURNING *;`;
  const res = await runQuery(query, [idCart, quantity]);
  return res.rows[0];
};
module.exports = {
  createCart,
  getCartByUserId,
};
