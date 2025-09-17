const express = require('express')
require('dotenv').config()
const db = require('./controllers/db')

const app = express()

app.get('/', (req, res)=>{
  res.send('hello there!!')
})

app.listen(process.env.PORT, ()=>{
  console.log(`express is running on port ${process.env.PORT}`)
})