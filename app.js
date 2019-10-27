const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const loginRoutes = require('./api/routes/login');
const studentsListRoutes = require('./api/routes/studentsList');
const studentDetailsRoutes = require('./api/routes/studentDetails');
const createStudentRoutes = require('./api/routes/createStudent');
const studentMarksheetRoutes = require('./api/routes/studentMarksheet');

const url = "mongodb://" + process.env.MLAB_USERNAME + ":" + process.env.MLAB_PASSWORD + "@ds115874.mlab.com:15874/academics";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// .then(() => {
//     console.log('connected');
// })
// .catch(err => {
//     console.log(err);
// })
;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/login', loginRoutes);
app.use('/students-list', studentsListRoutes);
app.use('/student-details', studentDetailsRoutes);
app.use('/create-student', createStudentRoutes);
app.use('/student-marksheet', studentMarksheetRoutes);

module.exports = app;