const express = require('express');
const cors = require('cors');
const path = require('path');
const database = require('./config/database');
const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

database.connect();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', menuRoutes);
app.use('/', authRoutes);

module.exports = app;
