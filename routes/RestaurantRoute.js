import express from 'express';

import {
	createRestaurant,
	getAllRestaurant,
	getRestaurantById,
	deleteRestaurantById,
	updateRestaurantById,
} from '../controllers/RestaurantController.js';

const router = express.Router();

router.route('/').get(getAllRestaurant).post(createRestaurant);
router
	.route('/:id')
	.get(getRestaurantById)
	.delete(deleteRestaurantById)
	.put(updateRestaurantById);

export default router;
