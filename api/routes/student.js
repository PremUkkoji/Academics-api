const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../../middleware/checkAuth');
const Marksheet = require('../models/marksheets');
const Student = require('../models/students');
const Faculty = require('../models/faculties');

// create student
router.post("/", checkAuth, (req, res, next) => {
    let studentDiv = req.body.div.toUpperCase();
    let studentUsn = req.body.usn.toUpperCase();
    if(studentDiv == "A" || studentDiv == "B"){
        Student.find({ usn: studentUsn })
        .exec()
        .then(student => {
            if(student.length >= 1)
            {
                return res.status(409).json({
                    message: 'USN already exists'
                });
            }
            else
            {
                const student = new Student({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    usn: req.body.usn.toUpperCase(),
                    div: req.body.div.toUpperCase(),
                    email: req.body.email,
                    password: req.body.password.toUpperCase(),
                    contact: req.body.contact
                });
                student.save()
                .then(result => {
                    //console.log(result);
                    Marksheet.find({ id: result._id })
                    .exec()
                    .then(marksheet => {
                        if(marksheet.length >= 1)
                        {
                            return res.status(409).json({
                                message: 'Marksheet already exist'
                            });
                        }
                        else
                        {
                            const marksheet = new Marksheet({
                                id: result._id,
                                mat: [0, 0, 0, 0],
                                matAvg: 0,
                                ds: [0, 0, 0, 0],
                                dsAvg: 0,
                                ade: [0, 0, 0, 0],
                                adeAvg: 0,
                                co: [0, 0, 0, 0],
                                coAvg: 0,
                                se: [0, 0, 0, 0],
                                seAvg: 0,
                                dms: [0, 0, 0, 0],
                                dmsAvg: 0,
                            });
                            marksheet.save()
                            .then(result => {})
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
                    res.status(201).json({
                        message: 'Student successfully added'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
    }else{
        return res.status(409).json({
            message: 'Division can only be "A" or "B"'
        });
    }
});

//student by id
router.get("/getStudent", checkAuth, (req, res, next) => {
    Student.findOne({ _id: req.headers.id })
    .select('email name usn div contact')
    .exec()
    .then(student => {
        res.status(200).json({
            authenticated: null,
            id: student._id,
            name: student.name,
            email: student.email,
            usn: student.usn,
            div: student.div,
            contact: student.contact,
            message: student.name.toString() + ' Details'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//students list
router.get("/", checkAuth, (req, res, next) => {
    var mysort = { usn: 1 };
    Student.find()
    .sort(mysort)
    .select('email name usn div contact')
    .exec()
    .then(students => {
        const response = students.map(student => {
            return {
                authenticated: null,
                id: student._id,
                name: student.name,
                email: student.email,
                usn: student.usn,
                div: student.div,
                contact: student.contact,
                message: student.name.toString() + ' Details'
            }
        });
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//delete student
router.delete("/", checkAuth, (req, res, next) => {
    Student.deleteOne({ _id: req.headers.id })
    .exec()
    .then(result => {
        if(result.deletedCount > 0)
        {
            Marksheet.deleteOne({ id: req.headers.id })
            .exec()
            .then(result => {})
            .catch(err => {
                res.status(200).json({
                    message: "Couldn\'t remove Marksheet of the student"
                });
            });

            res.status(200).json({
                message: 'Student removed successfully',
            });
        }
        else
        {
            res.status(200).json({
                message: 'Student doesn\'t exist'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//update student
router.patch("/", checkAuth, (req, res, next) => {
    let id = req.body.id;
    let student = {
        usn: req.body.usn.toUpperCase(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password.toUpperCase(),
        contact: req.body.contact,
        div: req.body.div.toUpperCase()
    };
    Student.updateOne({ _id: id }, { $set: student })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Student Details Updated'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;