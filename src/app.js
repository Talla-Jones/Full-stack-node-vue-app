// src/app.js
const express = require('express');
const cors = require('cors');
const messageRoutes = require("./routers/messageRoutes");
const userRoutes = require('./routers/userRoutes');
const postRoutes = require('./routers/postsRoutes');
const applicationRoutes = require('./routers/applicationRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/postings', postRoutes);
app.use('/applications', applicationRoutes);
app.use("/messages", messageRoutes);

module.exports = app;

