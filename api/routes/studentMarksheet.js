const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../../middleware/checkAuth');
const Student = require('../models/students');
const Faculty = require('../models/faculties');
const Marksheet = require('../models/marksheets');

router.get("/:id", (req, res, next) => {
    var Id = req.params.id;
    Marksheet.findOne({ id: Id })
    .select('mat matAvg ds dsAvg ade adeAvg co coAvg se seAvg dms dmsAvg')
    .exec()
    .then(marksheet => {
        res.status(200).json({
            mat: marksheet.mat,
            matAvg: marksheet.matAvg,
            ds: marksheet.ds,
            dsAvg: marksheet.dsAvg,
            ade: marksheet.ade,
            adeAvg: marksheet.adeAvg,
            co: marksheet.co,
            coAvg: marksheet.coAvg,
            se: marksheet.se,
            seAvg: marksheet.seAvg,
            dms: marksheet.dms,
            dmsAvg: marksheet.dmsAvg
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch("/", checkAuth, (req, res, next) => {
    let Id = req.body.id;
    let marksheet = req.body.ia;
    Marksheet.updateOne({ id: Id }, { $set: marksheet })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Marksheet Updated Successfully'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;