const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {
        staff: {
            type: Number,
            default: 2002
        },
        Admin: {
            type: Number,
            default: 5000
        }
    },

    Active: {
        type: Boolean,
        default: true
    }

})
module.exports = mongoose.model('Admin', adminSchema)