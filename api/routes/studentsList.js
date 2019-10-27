const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get("/:Id", (req, res, next) => {
    res.status(200).json({
        message: 'studentList'
    });
});

module.exports = router;