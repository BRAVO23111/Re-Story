import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Timeline,
  People,
  EmojiObjects,
  TrendingUp,
} from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(75, 85, 99, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  height: "100%",
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  background: "rgba(59, 130, 246, 0.1)",
  color: theme.palette.primary.main,
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(75, 85, 99, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  height: "100%",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
  },
}));

const AboutUsPage = () => {
  const features = [
    {
      icon: <Timeline sx={{ fontSize: 32 }} />,
      title: "Our Journey",
      description:
        "Started in 2020, ReStory has grown from a small startup to a thriving platform with millions of users worldwide.",
    },
    {
      icon: <People sx={{ fontSize: 32 }} />,
      title: "Community",
      description:
        "We've built a vibrant community of storytellers, readers, and creators who share their unique perspectives.",
    },
    {
      icon: <EmojiObjects sx={{ fontSize: 32 }} />,
      title: "Innovation",
      description:
        "Continuously pushing boundaries with cutting-edge technology to enhance the storytelling experience.",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      title: "Growth",
      description:
        "Expanding our reach and impact while staying true to our mission of empowering voices worldwide.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/api/placeholder/150/150",
      bio: "Visionary leader with 15+ years in digital storytelling",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "/api/placeholder/150/150",
      bio: "Tech innovator with a passion for user experience",
    },
    {
      name: "Elena Rodriguez",
      role: "Creative Director",
      image: "/api/placeholder/150/150",
      bio: "Award-winning designer and storytelling expert",
    },
    {
      name: "David Kim",
      role: "Head of Community",
      image: "/api/placeholder/150/150",
      bio: "Community builder and engagement specialist",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #1a1a1a, #2d3748)",
      }}
    >
      <NavBar />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          py: 12,
          textAlign: "center",
          color: "white",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 3, fontWeight: "bold" }}>
            About ReStory
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 6, color: "rgba(255, 255, 255, 0.7)" }}
          >
            Empowering voices, connecting stories, building communities
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <StyledCard>
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="h4" sx={{ mb: 3, color: "white" }}>
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: 800, mx: "auto" }}
            >
              At ReStory, we believe every story matters. Our mission is to provide a
              platform where people from all walks of life can share their unique
              experiences, connect with others, and make their voices heard. We're
              dedicated to creating a safe, inclusive, and engaging space for
              storytelling that bridges cultures and brings people together.
            </Typography>
          </CardContent>
        </StyledCard>
      </Container>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <StyledCard>
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "white", fontWeight: "bold" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Typography
          variant="h4"
          sx={{ mb: 6, color: "white", textAlign: "center" }}
        >
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {team.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member.name}>
              <TeamMemberCard>
                <CardContent sx={{ p: 4 }}>
                  <Avatar
                    src={member.image}
                    sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, color: "white", fontWeight: "bold" }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 2, color: theme => theme.palette.primary.main }}
                  >
                    {member.role}
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {member.bio}
                  </Typography>
                </CardContent>
              </TeamMemberCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ mb: 12, textAlign: "center" }}>
        <StyledCard>
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h4" sx={{ mb: 3, color: "white" }}>
              Join Our Story
            </Typography>
            <Typography
              sx={{ mb: 4, color: "rgba(255, 255, 255, 0.7)", maxWidth: 600, mx: "auto" }}
            >
              Be part of our growing community and help us shape the future of
              digital storytelling.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
            >
              Get Started
            </Button>
          </CardContent>
        </StyledCard>
      </Container>

    </Box>
  );
};

export default AboutUsPage;