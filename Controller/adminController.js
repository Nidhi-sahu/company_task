const adminSchema = require('../model/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create Admin
const createAdmin = async (req, res) => {
    const { username, password, schoolId, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new adminSchema({ username, password: hashedPassword, schoolId, role });
        await admin.save();
        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminSchema.find().populate('schoolId', 'name subdomain');
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get 
const getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await adminSchema.findById(id).populate('schoolId', 'name subdomain');
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update 
const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, password, schoolId, role } = req.body;
    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updatedData = {
            username,
            password: hashedPassword || undefined,
            schoolId,
            role,
        };

        const admin = await adminSchema.findByIdAndUpdate(id, updatedData, { new: true });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin updated successfully', admin });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// delete 
const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await adminSchema.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//  Login
const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await adminSchema.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
};