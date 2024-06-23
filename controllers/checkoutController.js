const runQuery = require("../server");
// Lay thong tin sp trong cart
const getCheckout = async (idAccount) => {
  const query = `SELECT "namePiza", "quantity", "NameSize", "Price", "Description" FROM "Cart"
                    JOIN "Piza" ON "Piza"."idPiza" = "Cart"."idPiza"
                    JOIN "PizaSize" ON "Piza"."idSize" = "PizaSize"."idSize" WHERE "Cart"."idAccount" = $1;`;
  const res = await runQuery(query, [idAccount]);
  return res.rows;
};
// Lay thong tin user
const getDetail = async (idAccount) => {
  const query = `SELECT "idAccount", "Name", "address", "phone" FROM "Account" WHERE "idAccount" = $1;`;
  const res = await runQuery(query, [idAccount]);
  return res.rows;
};

module.exports = {
  getCheckout,
  getDetail,
};
