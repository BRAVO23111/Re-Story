import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  fontSize: "1rem",
}));

const ProfileForm = ({
  profile,
  error,
  success,
  newInterest,
  setNewInterest,
  onSubmit,
  onAddInterest,
  onRemoveInterest,
  onLocationChange,
  setProfile,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <StyledTextField
        fullWidth
        label="Bio"
        multiline
        rows={4}
        value={profile.bio || ""}
        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
        margin="normal"
      />

      <StyledTextField
        fullWidth
        label="Date of Birth"
        type="date"
        value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : ''}
        onChange={(e) => setProfile((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <StyledTextField
            fullWidth
            label="City"
            value={(profile.location || {}).city || ""}
            onChange={(e) => onLocationChange("city", e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            fullWidth
            label="Country"
            value={(profile.location || {}).country || ""}
            onChange={(e) => onLocationChange("country", e.target.value)}
            margin="normal"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ color: "white", mb: 2 }}>Interests</Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <StyledTextField
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add an interest"
            size="small"
          />
          <Button variant="contained" onClick={onAddInterest} sx={{ minWidth: "100px" }}>Add</Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {(profile.interests || []).map((interest, index) => (
            <Chip
              key={index}
              label={interest}
              onDelete={() => onRemoveInterest(interest)}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white" }}
            />
          ))}
        </Box>
      </Box>

      <StyledButton fullWidth variant="contained" size="large" type="submit" sx={{ mt: 4 }}>
        Save Profile
      </StyledButton>
    </form>
  );
};

export default ProfileForm;