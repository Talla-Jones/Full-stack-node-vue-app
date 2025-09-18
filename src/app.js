const express = require('express')
const app = express()

app.use(express.json())

const userRoutes = require('./routers/userRoutes')
const applicationRoutes = require('./routers/applicationRoutes')

app.use('/users', userRoutes);
app.use('/application', applicationRoutes);

module.exports = app;