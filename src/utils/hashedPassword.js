const bcrypt = require('bcrypt');

async function hashPassword(password) {
  return await bcrypt.hash(password, 10)
}
async function comparator(password1, password2) {
  return await bcrypt.compare(password1, password2)
}
module.exports = {hashPassword, comparator};