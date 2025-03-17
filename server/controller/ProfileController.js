import ProfileModel from "../model/ProfileModel.js";
import User from "../model/UserModel.js"; // Ensure correct import for User model


export const createProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bio, dateOfBirth, location, interests } = req.body;

        // Validate bio length
        if (bio && bio.length > 300) {
            return res.status(400).json({
                status: "error",
                message: "Bio must not exceed 300 characters"
            });
        }

        // Validate date format
        if (dateOfBirth && isNaN(new Date(dateOfBirth).getTime())) {
            return res.status(400).json({
                status: "error",
                message: "Invalid date format for date of birth"
            });
        }

        // Validate location format
        if (location && (typeof location !== 'object' || !location.city || !location.country)) {
            return res.status(400).json({
                status: "error",
                message: "Location must include both city and country"
            });
        }

        // Validate interests array
        if (interests && (!Array.isArray(interests) || interests.some(i => typeof i !== 'string'))) {
            return res.status(400).json({
                status: "error",
                message: "Interests must be an array of strings"
            });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        // Check if profile already exists for the user
        const existingProfile = await ProfileModel.findOne({ user: userId });
        if (existingProfile) {
            return res.status(400).json({
                status: "error",
                message: "Profile already exists"
            });
        }

        // Create and save profile with sanitized data
        const profile = new ProfileModel({
            user: userId,
            bio: bio ? bio.trim() : undefined,
            dateOfBirth,
            location: location ? {
                city: location.city.trim(),
                country: location.country.trim()
            } : undefined,
            interests: interests ? interests.map(i => i.trim()).filter(i => i.length > 0) : []
        });

        await profile.save();

        res.status(201).json({
            status: "success",
            data: profile
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getProfile = async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user._id }).populate("user", "firstname lastname email");

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bio, dateOfBirth, location, interests } = req.body;

        // Validate bio length
        if (bio && bio.length > 300) {
            return res.status(400).json({
                status: "error",
                message: "Bio must not exceed 300 characters"
            });
        }

        // Validate date format
        if (dateOfBirth && isNaN(new Date(dateOfBirth).getTime())) {
            return res.status(400).json({
                status: "error",
                message: "Invalid date format for date of birth"
            });
        }

        // Validate location format
        if (location && (typeof location !== 'object' || !location.city || !location.country)) {
            return res.status(400).json({
                status: "error",
                message: "Location must include both city and country"
            });
        }

        // Validate interests array
        if (interests && (!Array.isArray(interests) || interests.some(i => typeof i !== 'string'))) {
            return res.status(400).json({
                status: "error",
                message: "Interests must be an array of strings"
            });
        }

        // Prepare sanitized updates
        const sanitizedUpdates = {
            ...(bio && { bio: bio.trim() }),
            ...(dateOfBirth && { dateOfBirth }),
            ...(location && { 
                location: {
                    city: location.city.trim(),
                    country: location.country.trim()
                }
            }),
            ...(interests && { 
                interests: interests.map(i => i.trim()).filter(i => i.length > 0)
            })
        };

        const profile = await ProfileModel.findOneAndUpdate(
            { user: userId },
            sanitizedUpdates,
            { new: true, runValidators: true }
        );

        if (!profile) {
            return res.status(404).json({
                status: "error",
                message: "Profile not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: profile
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const profile = await ProfileModel.findOneAndDelete({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
