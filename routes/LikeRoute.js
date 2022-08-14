import express from 'express';
import {
	toggleLike,
	getAllLike,
	deleteLikeById,
	getLikeById,
} from '../controllers/LikeController.js';

const router = express.Router();

router.route('/like').post(toggleLike).get(getAllLike);
router.route('/like/:id').delete(deleteLikeById).get(getLikeById);

export default router;
