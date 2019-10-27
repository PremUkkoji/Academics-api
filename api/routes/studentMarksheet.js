const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get("/:Id", (req, res, next) => {
    res.status(200).json({
        message: 'studentMarkseet'
    });
});

router.patch("/:Id", (req, res, next) => {
    res.status(200).json({
        message: 'studentMarkseet1'
    });
});

module.exports = router;