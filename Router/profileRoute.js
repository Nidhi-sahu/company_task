const express = require('express');
const router = express.Router();
const {
    createProfile,
    getProfileBySchoolId,
    updateProfile,
    deleteProfile,
} = require('../Controller/profileController');

// Define routes
router.post('/create', createProfile);
router.get('/get/:schoolId', getProfileBySchoolId);
router.put('/update/:schoolId', updateProfile);
router.delete('/delete/:schoolId', deleteProfile);

module.exports = router;
