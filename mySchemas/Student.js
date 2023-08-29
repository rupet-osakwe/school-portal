const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
    }

})
module.exports = mongoose.model('Student', studentSchema)