const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Student = require('../models/students');

router.post("/", (req, res, next) => {
    Student.find({ email: req.body.email })
    .exec()
    .then(student => {
        if(student.length >= 1)
        {
            return res.status(409).json({
                message: 'mail exits'
            });
        }
        else
        {
            const student = new Student({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                usn: req.body.usn,
                email: req.body.email,
                password: req.body.password,
                contact: req.body.contact
            });
            student.save()
            .then(result => {
                res.status(201).json({
                    message: 'student created'
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