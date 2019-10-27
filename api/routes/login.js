const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post("/", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    res.status(200).json({
        message: 'login'
    });
});

module.exports = router;