const runQuery = require("../server");

const createOrder = async (order) => {
  const { idAccount, totalOrderPiza } = order;
  const query = `INSERT INTO "OrderPiza" ("idAccount", "totalOrderPiza") VALUES ($1, $2) RETURNING *;`;
  const res = await runQuery(query, [idAccount, totalOrderPiza]);
  return res.rows[0];
};

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

const getOrderDetailsByOrderId = async (idOrderPiza) => {
  const query = `
      SELECT * FROM "OrderDetail" WHERE "idOrderPiza" = $1;
    `;
  const res = await runQuery(query, [idOrderPiza]);
  return res.rows;
};

module.exports = {
  createOrder,
  createOrderDetail,
  getOrderDetailsByOrderId,
};
