const profileSchema = require('../model/profile');

// Create Profile
const createProfile = async (req, res) => {
    const { schoolId, address, principal, facilities } = req.body;
    try {
        const profile = new profileSchema({ schoolId, address, principal, facilities });
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Profile by School ID
const getProfileBySchoolId = async (req, res) => {
    const { schoolId } = req.params;
    try {
        const profile = await profileSchema.findOne({ schoolId }).populate('schoolId');
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update Profile
const updateProfile = async (req, res) => {
    const { schoolId } = req.params;
    try {
        const updatedProfile = await profileSchema.findOneAndUpdate(
            { schoolId },
            req.body,
            { new: true }
        );
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete Profile
const deleteProfile = async (req, res) => {
    const { schoolId } = req.params;
    try {
        const profile = await profileSchema.findOneAndDelete({ schoolId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createProfile, getProfileBySchoolId, updateProfile, deleteProfile  }