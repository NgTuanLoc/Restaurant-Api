import express from 'express';

import {
	createRestaurant,
	getAllRestaurant,
	getRestaurantById,
	deleteRestaurantById,
	updateRestaurantById,
} from '../controllers/RestaurantController.js';

const router = express.Router();

router.get('/restaurant', getAllRestaurant);
router.get('/restaurant/:id', getRestaurantById);
router.delete('/restaurant/:id', deleteRestaurantById);
router.put('/restaurant/:id', updateRestaurantById);
router.post('/restaurant', createRestaurant);

export default router;
