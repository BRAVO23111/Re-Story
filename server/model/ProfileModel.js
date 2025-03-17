import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bio: {
        type: String,
        maxlength: 300 
    },
    dateOfBirth: {
        type: Date,
    },
    location: {
        city: { type: String },
        country: { type: String }
    },
    interests: {
        type: [String], // Array of interests/hobbies
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ProfileModel = mongoose.model("Profile", ProfileSchema);

export default ProfileModel;
