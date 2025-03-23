const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    address: {
        type: String,
    },
    principal: {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    facilities: [
        {
            type: String,
        },
    ],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Profile', profileSchema);
