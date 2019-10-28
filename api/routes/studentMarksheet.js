const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get("/:Usn", (req, res, next) => {
    res.status(200).json({
        message: 'get'
    });
});

router.patch("/:Usn", (req, res, next) => {
    res.status(200).json({
        message: 'Updated'
    });
});

module.exports = router;