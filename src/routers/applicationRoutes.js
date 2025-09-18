const express = require('express')
const router = express.Router()
const Application = require('../controllers/applicationControllers')

router.post('/submit', Application.addApplication);
router.delete('/delete', Application.removeApplication);