const fs = require("fs");
const runQuery = require("../server");
// Xóa ảnh
const deleteImageFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const createPizza = async (pizza) => {
  const { namePiza, Description, imgPiza, idSize } = pizza;
  const query = `INSERT INTO "Piza" ("namePiza", "Description", "imgPiza", "idSize") VALUES ($1, $2, $3, $4) RETURNING *;`;
  const res = await runQuery(query, [namePiza, Description, imgPiza, idSize]);
  return res.rows[0];
};

const getPizzas = async () => {
  const query = `SELECT * FROM "Piza";`;
  const res = await runQuery(query);
  return res.rows;
};

const getPizzaById = async (idPiza) => {
  const query = `SELECT * FROM "Piza" WHERE "idPiza" = $1;`;
  const res = await runQuery(query, [idPiza]);
  return res.rows[0];
};

const updatePizza = async (idPiza, pizza) => {
  const { namePiza, Description, imgPiza, idSize } = pizza;
  // Lấy thông tin pizza
  const currentAccount = await getPizzaById(idPiza);
  // Nếu có ảnh mới xóa ảnh cũ
  if (imgPiza && currentAccount.imgPiza) {
    deleteImageFile(currentAccount.imgPiza);
  }

  const query = `UPDATE "Piza" SET "namePiza" = $1, "Description" = $2, "imgPiza" = $3, "idSize" = $4 WHERE "idPiza" = $5 RETURNING *;`;
  const res = await runQuery(query, [
    namePiza,
    Description,
    imgPiza,
    idSize,
    idPiza,
  ]);
  return res.rows[0];
};

const deletePizza = async (idPiza) => {
  const currentAccount = await getPizzaById(idPiza);

  const query = `DELETE FROM "Piza" WHERE "idPiza" = $1 RETURNING *;`;
  const res = await runQuery(query, [idPiza]);

  if (currentAccount.imgPiza) {
    deleteImageFile(currentAccount.imgPiza);
  }

  return res.rows[0];
};

module.exports = {
  createPizza,
  getPizzas,
  getPizzaById,
  updatePizza,
  deletePizza,
};
