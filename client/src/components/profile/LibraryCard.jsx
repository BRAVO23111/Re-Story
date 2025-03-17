import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  overflow: "hidden",
  position: "relative"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "12px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1rem",
}));

const LibraryCard = ({ profile, onEdit }) => {
  const location = profile.location || { city: "", country: "" };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ 
            position: "absolute", 
            top: 20, 
            right: 20, 
            background: "rgba(255, 255, 255, 0.1)",
            padding: "4px 12px",
            borderRadius: "12px",
            backdropFilter: "blur(5px)"
          }}>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Member since {new Date().getFullYear()}
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ color: "white", mb: 3, fontWeight: "bold" }}>
            ReStory Library Card
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                Bio
              </Typography>
              <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                {profile.bio || "No bio provided"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                Date of Birth
              </Typography>
              <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "Not specified"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                Location
              </Typography>
              <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                {location.city && location.country 
                  ? `${location.city}, ${location.country}`
                  : "Not specified"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 2 }}>
                Interests
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {(profile.interests || []).map((interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      '&:hover': {
                        backgroundColor: "rgba(255, 255, 255, 0.2)"
                      }
                    }}
                  />
                ))}
                {(!profile.interests || profile.interests.length === 0) && (
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                    No interests added
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <StyledButton
              variant="outlined"
              onClick={onEdit}
              sx={{
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.3)",
                '&:hover': {
                  borderColor: "white"
                }
              }}
            >
              Edit Profile
            </StyledButton>
          </Box>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default LibraryCard;