import express from 'express';
import {
	toggleRating,
	getAllRating,
	getRatingById,
	deleteRatingById,
	updateRatingById,
} from '../controllers/RatingController.js';

const router = express.Router();

router.route('/').post(toggleRating).get(getAllRating);
router
	.route('/:id')
	.delete(deleteRatingById)
	.get(getRatingById)
	.put(updateRatingById);

export default router;
