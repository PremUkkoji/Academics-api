const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Student = require('../models/students');
const Faculty = require('../models/faculties');

// create student
router.post("/", (req, res, next) => {
    Student.find({ email: req.body.email })
    .exec()
    .then(student => {
        if(student.length >= 1)
        {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }
        else
        {
            const student = new Student({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                usn: req.body.usn,
                div: req.body.div,
                email: req.body.email,
                password: req.body.password,
                contact: req.body.contact
            });
            student.save()
            .then(result => {
                res.status(201).json({
                    message: 'Student successfully created'
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
});

module.exports = router;