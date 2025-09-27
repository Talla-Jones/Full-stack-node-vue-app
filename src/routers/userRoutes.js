const express = require('express')
const router = express.Router()
const model = require('../Models/userModels')
const {addUser, updateUser, deleteUser, getUser, adminOnly, hodOnly} = require('../controllers/userControllers')
const auth = require('../utils/middleware');

router.post('/register', addUser)
router.patch('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.post('/login', getUser)

router.get('/profile', auth, async (req, res) => {
  console.log(req.user);
  
  const result = await model.getUserByEmail(req.user.email)
  res.json({message: `Welcome back ${result.full_name}`})
});

router.post('/admin_dashboard', auth, adminOnly, getUser)
router.post('/hod_dashboard', auth, hodOnly, getUser)


module.exports = router