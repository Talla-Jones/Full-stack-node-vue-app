const db = require('../config/db')
const hashPassword = require('../utils/hashedPassword')


async function createUser(username, email, password, role_id) {
  const hashedPassword = await hashPassword(password);
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password, role_id) values (?, ?, ?, ?)',
    [username, email, hashedPassword, role_id]
  );
  return result.insertId;
}

async function updateUser(id, {username, email, password}){
  const hashedPassword = await hashPassword.hashPassword(password);
  const query = `UPDATE users SET username = ?, email = ? , password = ? WHERE id = ?`;
  const [result] = await db.execute(query, [username, email, hashedPassword, id])
  return result;
}

async function deleteUser(id) {
  const query = `DELETE FROM users WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result;
}

async function getUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = ?`
  const [result] = await db.execute(query, [email])
  return result[0];
}


module.exports = {createUser, updateUser, deleteUser, getUserByEmail}