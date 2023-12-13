const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    userName: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    dateOfBirth: String,
    gender: String,
    studentClass: {
        type: String,
        required: true
    },
    role: {
        Student: {
            type: Number,
            default: 2000
        }
    },
    fathersName: String,
    fathersPhoneNumber: Number,
    mothersName: String,
    mothersPhoneNumber: Number,
    homeAddress: String

})
module.exports = mongoose.model('Student', studentSchema)