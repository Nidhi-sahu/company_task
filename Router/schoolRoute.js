const express = require('express');
const {
    getSchools,
    getSchoolBySubdomain,
    createSchool,
    updateSchool,
    deleteSchool,
} = require('../Controller/schoolController');

const router = express.Router();

//  Routes
router.get('/get', getSchools);
router.get('/get/:subdomain', getSchoolBySubdomain);
router.post('/post', createSchool);
router.put('/update/:subdomain', updateSchool);
router.delete('/delete/:subdomain', deleteSchool);

module.exports = router;



