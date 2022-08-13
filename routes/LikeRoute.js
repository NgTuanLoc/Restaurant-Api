import express from 'express';
import {
	createLike,
	getAllLike,
	deleteLikeById,
	getLikeById,
} from '../controllers/LikeController.js';

const router = express.Router();

router.route('/like').post(createLike).get(getAllLike);
router.route('/like/:id').delete(deleteLikeById).get(getLikeById);

export default router;
