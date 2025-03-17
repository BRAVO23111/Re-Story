import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Box, Container } from "@mui/material";
import LibraryCard from "../components/profile/LibraryCard";
import ProfileForm from "../components/profile/ProfileForm";
import api from "../config/config";

const ProfilePage = () => {
  // Initialize with empty location object to prevent undefined errors
  const [profile, setProfile] = useState({
    bio: "",
    dateOfBirth: null,
    location: { city: "", country: "" },
    interests: [],
  });
  const [showLibraryCard, setShowLibraryCard] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/profile');
        const profileData = response.data;
        
        // Ensure location is initialized properly
        setProfile({
          bio: profileData.bio || "",
          dateOfBirth: profileData.dateOfBirth || null,
          location: profileData.location || { city: "", country: "" },
          interests: profileData.interests || [],
          _id: profileData._id
        });
        
        // If profile exists, show the library card
        if (profileData._id) {
          setShowLibraryCard(true);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          return;
        }
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Ensure location is not undefined before submitting
    const submittableProfile = {
      ...profile,
      location: profile.location || { city: "", country: "" }
    };

    try {
      let response;
      if (submittableProfile._id) {
        response = await api.put('/api/profile', submittableProfile);
        setSuccess("Profile updated successfully");
      } else {
        response = await api.post('/api/profile', submittableProfile);
        setSuccess("Profile created successfully");
      }
      
      // Ensure location is properly set in the returned data
      const responseData = response.data;
      setProfile({
        ...responseData,
        location: responseData.location || { city: "", country: "" }
      });
      
      // Show library card after successful submission
      setTimeout(() => {
        setShowLibraryCard(true);
      }, 1500); // Short delay to show success message
    } catch (err) {
      setError(err.response?.data?.message || "Failed to manage profile");
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile((prev) => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest) => {
    setProfile((prev) => ({
      ...prev,
      interests: (prev.interests || []).filter((i) => i !== interest),
    }));
  };

  // Ensure proper location handling in form changes
  const handleLocationChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      location: {
        ...(prev.location || { city: "", country: "" }),
        [field]: value
      }
    }));
  };

  return (
    <Box sx={{ background: "linear-gradient(to bottom, #1a1a1a, #2d3748)", minHeight: "100vh" }}>
      <NavBar />
      <Container maxWidth="md" sx={{ pt: 15, pb: 4 }}>
        {showLibraryCard ? (
          <LibraryCard 
            profile={profile} 
            onEdit={() => setShowLibraryCard(false)} 
          />
        ) : (
          <ProfileForm
            profile={profile}
            error={error}
            success={success}
            newInterest={newInterest}
            setNewInterest={setNewInterest}
            onSubmit={handleSubmit}
            onAddInterest={handleAddInterest}
            onRemoveInterest={handleRemoveInterest}
            onLocationChange={handleLocationChange}
            setProfile={setProfile}
          />
        )}
      </Container>
    </Box>
  );
};

export default ProfilePage;