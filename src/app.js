const express = require('express')
const app = express()

app.use(express.json())

const userRoutes = require('./routers/userRoutes')

app.use('/users', userRoutes);

module.exports = app;