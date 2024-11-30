import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
  List,
  ListItem,
  styled,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";

const StyledFooter = styled(Box)(({ theme }) => ({
  background: "rgba(17, 24, 39, 0.95)",
  backdropFilter: "blur(10px)",
  borderTop: "1px solid rgba(75, 85, 99, 0.3)",
  color: "white",
  position: "relative",
  zIndex: 1,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.7)",
  textDecoration: "none",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.7)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    color: theme.palette.primary.main,
    transform: "translateY(-2px)",
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.7)",
  marginBottom: theme.spacing(2),
}));

const Footer = () => {
  const quickLinks = [
    { text: "About Us", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Blog", href: "/blog" },
    { text: "Contact", href: "/contact" },
  ];

  const resources = [
    { text: "Help Center", href: "/help" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" },
    { text: "FAQ", href: "/faq" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              ReStory
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 3, color: "rgba(255, 255, 255, 0.7)" }}
            >
              Empowering users to create, share, and explore stories that matter.
              Join our community and be part of something extraordinary.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <SocialIconButton>
                <FacebookIcon />
              </SocialIconButton>
              <SocialIconButton>
                <TwitterIcon />
              </SocialIconButton>
              <SocialIconButton>
                <InstagramIcon />
              </SocialIconButton>
              <SocialIconButton>
                <LinkedInIcon />
              </SocialIconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <List dense disablePadding>
              {quickLinks.map((link) => (
                <ListItem key={link.text} disablePadding sx={{ mb: 1 }}>
                  <StyledLink href={link.href}>{link.text}</StyledLink>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Resources
            </Typography>
            <List dense disablePadding>
              {resources.map((link) => (
                <ListItem key={link.text} disablePadding sx={{ mb: 1 }}>
                  <StyledLink href={link.href}>{link.text}</StyledLink>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Contact Us
            </Typography>
            <ContactItem>
              <LocationIcon />
              <Typography variant="body2">
                123 Story Street, Novel City, BC 12345
              </Typography>
            </ContactItem>
            <ContactItem>
              <PhoneIcon />
              <Typography variant="body2">+1 (555) 123-4567</Typography>
            </ContactItem>
            <ContactItem>
              <EmailIcon />
              <Typography variant="body2">support@restory.com</Typography>
            </ContactItem>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center" }}
          >
            © {currentYear} ReStory. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <StyledLink href="/terms" variant="body2">
              Terms
            </StyledLink>
            <StyledLink href="/privacy" variant="body2">
              Privacy
            </StyledLink>
            <StyledLink href="/cookies" variant="body2">
              Cookies
            </StyledLink>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;