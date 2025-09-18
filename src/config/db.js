const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}).promise();

(async () => {
  try {
    await db.connect();
    console.log('MySQL connected');
  } catch (err) {
    console.error('Error connecting:', err.message);
  }
})();

module.exports = db;

