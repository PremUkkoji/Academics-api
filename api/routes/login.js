const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const checkAuth = require('../../middleware/checkAuth');
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
                name: "",
                email: "",
                message: 'Invalid credentials'
            });
        }
        else
        {
            if(req.body.password == faculty[0].password)
            {
                const token = jwt.sign({
                    email: faculty[0].email,
                    facultyId: faculty[0]._id 
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    token: token,
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
                    name: "",
                    email: "",
                    message: 'Invalid credentials'
                });
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//faculty logout
router.post("/logoutFaculty", checkAuth, (req, res, next) => {
    const token = req.headers.authorization;
    //console.log(token);
    try{
        jwt.destroy(token);
        return res.status(200).json({
            message: 'Logged out successfully'
        }); 
    }catch(error){
        return res.status(204).json({
            message: "Couldn\'t logged out"
        });
    }
});

//student login
router.post("/student", (req, res, next) => {
    let studentUsn = req.body.usn.toUpperCase();
    let studentPassword = req.body.password.toUpperCase();
    Student.find({ usn: studentUsn })
    .select('email password name usn div contact')
    .exec()
    .then(student => {
        if(student.length < 1)
        {
            return res.status(200).json({
                authenticated: false,
                id: "",
                name: "",
                email: "",
                usn: "",
                div: "",
                contact: "",
                message: 'Invalid credentials'
            });
        }
        else
        {
            if(studentPassword == student[0].password)
            {
                return res.status(200).json({
                    authenticated: true,
                    id: student[0]._id,
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
                return res.status(200).json({
                    authenticated: false,
                    id: "",
                    name: "",
                    email: "",
                    usn: "",
                    div: "",
                    contact: "",
                    message: 'Invalid credentials'
                });
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;