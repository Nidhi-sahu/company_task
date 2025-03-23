const express = require('express');
const router = express.Router();
const {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
} = require('../Controller/adminController');


router.post('/create', createAdmin);
router.get('/all', getAllAdmins);
router.get('/:id', getAdminById);
router.put('/update/:id', updateAdmin);
router.delete('/delete/:id', deleteAdmin);
router.post('/login', loginAdmin);

module.exports = router;