const app = require('./app');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

var environment = process.env.NODE_ENV || 'development';


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// module.exports = server;