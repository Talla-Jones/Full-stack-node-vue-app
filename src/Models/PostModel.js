const db = require('../config/db');

async function createPost(post, department, creator, title, description, requirements, open_date, close_date) {
  const [result] = await db.execute(
    'INSERT INTO postings (posting_id, department_id, created_by, title, description, requirements, open_date, close_date) values (?, ?, ?, ?, ?, ?, ?, ?)',
    [post, department, creator, title, description, requirements, open_date, close_date]
  );
  return result.insertId;
}

async function deletePost(id) {
  const query = `DELETE FROM postings WHERE posting_id = ?`;
  const [result] = await db.execute(query, [id]);
  return result;
}

module.exports = {createPost, deletePost}