const bcrypt = require('bcrypt');

function hashPassword(password) {
  return bcrypt.hash(password, 10)
}
function comparator(password1, password2) {
  return bcrypt.compare(password1, password2)
}
module.exports = {hashPassword, comparator};