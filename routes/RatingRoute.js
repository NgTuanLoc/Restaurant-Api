import express from 'express';
import {
	createRating,
	getAllRating,
	getRatingById,
	deleteRatingById,
} from '../controllers/RatingController.js';

const router = express.Router();

router.route('/rating').post(createRating).get(getAllRating);
router.route('/rating/:id').delete(deleteRatingById).get(getRatingById);

export default router;
