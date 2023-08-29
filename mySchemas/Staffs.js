const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: String,
    dateOfBirth: String,
    gender: String,
    maritalStatus: String,
    email: {
        type: String,
        required: true
    },
    roles: {
        staff: {
            type: Number,
            default: 2002
        },
        Admin: Number
    },
    designation: {
        type: String,
        required: true
    },
    Active: {
        type: Boolean,
        default: true
    }

})
module.exports = mongoose.model('Staff', staffSchema)