const express = require('express');
const app = require('./src/app');

app.listen(process.env.PORT, ()=>{
  console.log('Running');
  
})