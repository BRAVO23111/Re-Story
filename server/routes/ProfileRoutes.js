import express from 'express';
import { createProfile, deleteProfile, getProfile, updateProfile } from '../controller/ProfileController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all profile routes
router.use(authMiddleware);

// Get authenticated user's profile
router.get('/', getProfile);

// Create profile for authenticated user
router.post('/', createProfile);

// Update authenticated user's profile
router.put('/', updateProfile);

// Delete authenticated user's profile
router.delete('/', deleteProfile);

export { router as ProfileRoute };
