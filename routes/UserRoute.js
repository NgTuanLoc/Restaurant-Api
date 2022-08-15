import express from 'express';

import {
	createUser,
	getAllUser,
	getUserById,
	deleteUserById,
	updateUserById,
} from '../controllers/UserController.js';

const router = express.Router();

router.route('/').get(getAllUser).post(createUser);
router
	.route('/:id')
	.get(getUserById)
	.put(updateUserById)
	.delete(deleteUserById);

export default router;
