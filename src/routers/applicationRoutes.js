const express = require('express')
const router = express.Router()
const {addApplication, removeApplication} = require('../controllers/applicationControllers')

router.post('/submit', addApplication);
router.delete('/delete/:id', removeApplication);

module.exports = router