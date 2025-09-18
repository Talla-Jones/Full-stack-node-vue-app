const express = require('express')
const router = express.Router()
const {addUser, updateUser, deleteUser, getUser} = require('../controllers/userControllers')
const auth = require('../utils/middleware');

router.post('/register', addUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.post('/login', getUser)

router.get('/profile', auth, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});


module.exports = router