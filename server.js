const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  database: "pizzaDb",
  port: 5432,
  user: "postgres",
  password: "admin123",
});
const checkConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database successfully.");
    client.release();
  } catch (err) {
    console.error("Error connecting to the database", err.stack);
  }
};

const runQuery = async (query, params) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res;
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    client.release();
  }
};

checkConnection();

module.exports = runQuery;
