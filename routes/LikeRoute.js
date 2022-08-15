import express from 'express';
import {
	toggleLike,
	getAllLike,
	deleteLikeById,
	getLikeById,
} from '../controllers/LikeController.js';

const router = express.Router();

router.route('/').post(toggleLike).get(getAllLike);
router.route('/:id').delete(deleteLikeById).get(getLikeById);

export default router;
