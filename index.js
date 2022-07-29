const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

require('dotenv').config();
const DB_URI = process.env.MONGO_URI

mongoose.connect(DB_URI);
const db = mongoose.connection

db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('DB Connected');
})

const app = express();
app.use(express.json());

app.use('/api', routes)

app.listen(3000, () => {
    console.log(`Server started at port 3000`)
})

