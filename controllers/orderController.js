const runQuery = require("../server");
//Tao order
const createOrder = async (order) => {
  const { idAccount, totalOrderPiza } = order;
  const query = `INSERT INTO "OrderPiza" ("idAccount", "totalOrderPiza") VALUES ($1, $2) RETURNING *;`;
  const res = await runQuery(query, [idAccount, totalOrderPiza]);
  return res.rows[0];
};
//Tao order detail
const createOrderDetail = async (orderDetail) => {
  const { idOrderPiza, idPiza, quantity, DesTopping } = orderDetail;
  const query = `INSERT INTO "OrderDetail" ("idOrderPiza", "idPiza", "quantity", "DesTopping") VALUES ($1, $2, $3, $4) RETURNING *;`;
  const res = await runQuery(query, [
    idOrderPiza,
    idPiza,
    quantity,
    DesTopping,
  ]);
  return res.rows[0];
};

//Lich su order cua nguoi dung
const getOrderByIdAccount = async (idAccount, idOrderPiza) => {
  const query = `SELECT "orderDate", "namePiza", "quantity", "DesTopping", "totalOrderPiza", "idAccount" FROM "OrderDetail"
                JOIN "OrderPiza" ON "OrderPiza"."idOrderPiza" = "OrderDetail"."idOrderPiza"
	              JOIN "Piza" ON "Piza"."idPiza" = "OrderDetail"."idPiza"
	              WHERE "idAccount" = $1 AND "OrderDetail"."idOrderPiza" = $2`;
  const res = await runQuery(query, [idAccount, idOrderPiza]);
  return res.rows;
};
const getOrder = async () => {
  const query = `SELECT * FROM "OrderPiza"
                JOIN "Account" ON "Account"."idAccount" = "OrderPiza"."idAccount"`;
  const res = await runQuery(query);
  return res.rows;
};
module.exports = {
  createOrder,
  createOrderDetail,
  getOrderByIdAccount,
  getOrder,
};
