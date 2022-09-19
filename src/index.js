const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./src/routes/routes');
require('dotenv').config();
const DB_URI = process.env.MONGO_URI
const app = express();


const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(express.json());
app.use(bodyParser.json());




app.use('/api/v1/', routes)


mongoose.connect(DB_URI);
const db = mongoose.connection




db.on('error', (error) => {
  console.log(error)
})

db.once('connected', () => {
  console.log('DB Connected');
})


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});


app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})

