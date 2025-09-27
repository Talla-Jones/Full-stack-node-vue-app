const express = require('express')
const router = express.Router()
const {addPost, removePost} = require('../controllers/postControllers')

router.post('/post', addPost);
router.delete('/delete/:id', removePost);

module.exports = router