const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin',
    },
});

module.exports = mongoose.model('Admin', adminSchema);
