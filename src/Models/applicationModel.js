const db = require('../config/db');

async function createApplication(user, category, years_of_experience, field) {
  const [result] = await db.execute(
    'INSERT INTO applications (user_id, category_id, years_of_experience, field_id) values (?, ?, ?, ?)',
    [user, category, years_of_experience, field]
  );
  return result.insertId;
}

async function deleteApplication(id) {
  const query = `DELETE FROM applications WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result;
}

module.exports = {createApplication, deleteApplication}