const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Student = require('../models/students');
const Faculty = require('../models/faculties');

//faculty login
router.post("/faculty", (req, res, next) => {
    Faculty.find({ email: req.body.email })
    .select('email password name')
    .exec()
    .then(faculty => {
        if(faculty.length < 1)
        {
            return res.status(401).json({
                authenticated: false,
                message: 'Invalid credentials'
            });
        }
        else
        {
            if(req.body.password == faculty[0].password)
            {
                return res.status(200).json({
                    authenticated: true,
                    name: faculty[0].name,
                    email: faculty[0].email,
                    message: 'Valid credentials'
                });
            }
            else
            {
                return res.status(401).json({
                    authenticated: false,
                    message: 'Invalid credentials'
                });
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            authenticated: false,
            message: 'Unexpected Error occured',
            error: err
        });
    });
});

//student login
router.post("/student", (req, res, next) => {
    Student.find({ email: req.body.email })
    .select('email password name usn div contact')
    .exec()
    .then(student => {
        if(student.length < 1)
        {
            return res.status(401).json({
                authenticated: false,
                message: 'Invalid credentials'
            });
        }
        else
        {
            if(req.body.password == student[0].password)
            {
                return res.status(200).json({
                    authenticated: true,
                    name: student[0].name,
                    email: student[0].email,
                    usn: student[0].usn,
                    div: student[0].div,
                    contact: student[0].contact,
                    message: 'Valid credentials'
                });
            }
            else
            {
                return res.status(401).json({
                    authenticated: false,
                    message: 'Invalid credentials'
                });
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            authenticated: false,
            message: 'Unexpected Error occured',
            error: err
        });
    });
});

module.exports = router;