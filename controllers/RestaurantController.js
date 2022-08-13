import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

const createRestaurant = async (req, res) => {
	try {
		const { name, image, desc } = req.body;
		const data = await prisma.restaurant.create({
			data: { name, image, desc },
		});
		res.status(StatusCodes.OK).send(data);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to create restaurant');
	}
};

const getAllRestaurant = async (req, res) => {
	const data = await prisma.restaurant.findMany({
		include: {
			RatingRestaurant: true,
			LikeRestaurant: true,
		},
	});
	res.status(200).send(data);
};

const getRestaurantById = async (req, res) => {
	try {
		const { id } = req.params;

		const data = await prisma.restaurant.findFirst({
			where: {
				id: id,
			},
		});
		if (data) {
			res.status(StatusCodes.OK).send(data);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`restaurant ${id} not exist`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to get restaurant by id');
	}
};

const deleteRestaurantById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.restaurant.findFirst(id);

		if (data) {
			await prisma.restaurant.delete({
				where: {
					id: id,
				},
			});

			res.status(StatusCodes.OK).send(`Delete restaurant ${id} successful`);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`Delete restaurant ${id} failed`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to delete restaurant by id');
	}
};

const updateRestaurantById = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, image, desc } = req.body;
		const data = await prisma.restaurant.findFirst(id);

		if (data) {
			await prisma.restaurant.update({
				where: { id: id },
				data: {
					name,
					image,
					desc,
				},
			});
			res.status(StatusCodes.OK).send(`Update restaurant ${id} successful`);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`Update restaurant ${id} failed`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to update restaurant by id');
	}
};

export {
	createRestaurant,
	getAllRestaurant,
	getRestaurantById,
	deleteRestaurantById,
	updateRestaurantById,
};
