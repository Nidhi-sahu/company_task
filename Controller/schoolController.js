const schoolSchema = require('../model/school');

// get schools
const getSchools = async (req, res) => {
    try {
        const schools = await schoolSchema.find({});
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSchoolBySubdomain = async (req, res) => {
    const { subdomain } = req.params;
    console.log(`Searching for school with subdomain: ${subdomain}`);
    try {
        const school = await schoolSchema.findOne({ subdomain });
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new school

const createSchool = async (req, res) => {
    const { name, subdomain, description, contact } = req.body;
    try {
        const school = new schoolSchema({ name, subdomain, description, contact });
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update school details
const updateSchool = async (req, res) => {
    const { subdomain } = req.params;
    try {
        const school = await schoolSchema.findOneAndUpdate({ subdomain }, req.body, {
            new: true,
        });
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json(school);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//  Delete a school
const deleteSchool = async (req, res) => {
    const { subdomain } = req.params;
    try {
        const school = await schoolSchema.findOneAndDelete({ subdomain });
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSchools, getSchoolBySubdomain, createSchool, updateSchool, deleteSchool }