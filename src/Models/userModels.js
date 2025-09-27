const db = require('../config/db')
const bcrypt = require('../utils/bcrypt')


async function createUser(username, email, password, portfolio, resume) {
  const hashedPassword = await bcrypt.hashPassword(password)
  
  const [result] = await db.execute(
    'INSERT INTO users (full_name, email, password_hash, portfolio_link, resume_path) values (?, ?, ?, ?, ?)',
    [username, email, hashedPassword, portfolio, resume]
  );
  return result;
}

async function updateUser(id, {username, email, password}){
  const hashedPassword = await bcrypt.hashPassword(password);
  const query = `UPDATE users SET full_name = ?, email = ? , password_hash = ? WHERE user_id = ?`;
  const [result] = await db.execute(query, [username, email, hashedPassword, id])
  return result;
}

async function deleteUser(id) {
  const query = `DELETE FROM users WHERE user_id = ?`;
  const [result] = await db.execute(query, [id]);
  return result;
}

async function getUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = ?`
  const [result] = await db.execute(query, [email])
  return result[0];
}


module.exports = {createUser, updateUser, deleteUser, getUserByEmail}