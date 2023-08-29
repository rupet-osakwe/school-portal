const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Result", resultSchema)