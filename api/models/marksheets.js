const mongoose = require('mongoose');

const marksheetSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    mat: { type: Array },
    matAvg: { type: Number },
    ds: { type: Array },
    dsAvg: { type: Number },
    ade: { type: Array },
    adeAvg: { type: Number },
    co: { type: Array },
    coAvg: { type: Number },
    se: { type: Array },
    seAvg: { type: Number },
    dms: { type: Array },
    dmsAvg: { type: Number },
});

module.exports = mongoose.model('Marksheet', marksheetSchema);