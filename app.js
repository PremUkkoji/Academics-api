const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Routes
const loginRoutes = require('./api/routes/login');
const studentRoutes = require('./api/routes/student');
const studentMarksheetRoutes = require('./api/routes/studentMarksheet');

const url = "mongodb://" + process.env.MLAB_USERNAME + ":" + process.env.MLAB_PASSWORD + "@ds115874.mlab.com:15874/academics";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
    console.log('Successfully connected to DB');
})
.catch(err => {
    console.log(err);
})
;

//paths
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors()); // Access Control Allow Origin
app.use('/login', loginRoutes);
app.use('/student', studentRoutes);
app.use('/student-marksheet', studentMarksheetRoutes);

module.exports = app;