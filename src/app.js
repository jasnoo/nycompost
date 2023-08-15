const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const sitesRouter = require('./routes/sites');
const mongoSanitize = require('express-mongo-sanitize');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit')
require('dotenv').config();


const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 30, // Limit each IP to 30 requests window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const swaggerDoc = require('./api-docs/openapi')

const DB_URI = (process.env.NODE_ENV === 'production') ? process.env.MONGO_URI : "mongodb://localhost:27017/NYCompostTest"
const PORT = process.env.PORT || 3000;


const app = express();
app.use(limiter)
app.use(helmet())
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.options('*', cors());

// v1 api doc route
app.use(
    "/api-docs/",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, { explorer: true })
);

// v1 api routes
app.use("/api/v1/sites", sitesRouter);

// unknown handling
app.use((req, res) => res.status(404).send('404 Not Found'));

// global error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});


mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });


module.exports = app;
