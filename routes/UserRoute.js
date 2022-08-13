import express from 'express';

import {
	createUser,
	getAllUser,
	getUserById,
	deleteUserById,
	updateUserById,
} from '../controllers/UserController.js';

const router = express.Router();

router.get('/user', getAllUser);
router.get('/user/:id', getUserById);
router.delete('/user/:id', deleteUserById);
router.put('/user/:id', updateUserById);
router.post('/user', createUser);

export default router;
