const express = require('express')

const app = express()

app.get('/', (req, res)=>{
  res.send('hello there!!')
})

app.listen(process.env.PORT, ()=>{
  console.log(`express is running on port ${process.env.PORT}`)
})