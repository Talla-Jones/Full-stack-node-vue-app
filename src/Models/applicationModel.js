const db = require('../config/db');

async function createApplication(post, applicant, cover_letter, notes) {
  const [result] = await db.execute(
    'INSERT INTO applications (posting_id, applicant_id, cover_letter, notes) values (?, ?, ?, ?)',
    [post, applicant, cover_letter, notes]
  );
  return result.insertId;
}

async function deleteApplication(id) {
  const query = `DELETE FROM applications WHERE application_id = ?`;
  const [result] = await db.execute(query, [id]);
  return result;
}

module.exports = {createApplication, deleteApplication}