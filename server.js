import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pizzaDb",
  password: "admin123",
  port: 5432,
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

export default runQuery;
