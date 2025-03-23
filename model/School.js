const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subdomain: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    contact: {
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('School', schoolSchema);
