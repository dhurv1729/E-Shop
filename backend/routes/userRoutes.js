import express from "express";
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile, deleteUserById, getUserByID, userUpdate } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/').get(protect, admin, getUsers)
router.route('/delete/:id').delete(protect, admin, deleteUserById);
router.route('/:id').get(protect, admin, getUserByID)
router.route('/update/:id').put(protect, admin, userUpdate)

export default router;