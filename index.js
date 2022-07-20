const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log(`Server started at port 3000`)
})