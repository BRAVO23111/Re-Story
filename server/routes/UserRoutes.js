import express from 'express';
import { loginUser, registerUser } from '../controller/UserContoller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post("/register" , registerUser);

export { router as UserRouter };