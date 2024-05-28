import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { getProfile, loginUser, logout, registerUser } from '../controller/userController.js';


const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getProfile', isAuthenticated,getProfile)
router.get('/logout', logout)

export default router;