import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

const createLike = async (req, res) => {
	try {
		const { userId, restaurantId } = req.body;
		const data = await prisma.likeRestaurant.create({
			data: { userId, restaurantId },
		});
		res.status(StatusCodes.OK).send(data);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Fail like restaurant');
	}
};

const getAllLike = async (req, res) => {
	const data = await prisma.likeRestaurant.findMany({
		include: {
			user: true,
			restaurant: true,
		},
	});
	res.status(200).send(data);
};

const getLikeById = async (req, res) => {
	try {
		const { id } = req.params;

		const data = await prisma.likeRestaurant.findFirst({
			where: {
				id: id,
			},
		});
		if (data) {
			res.status(StatusCodes.OK).send(data);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`like ${id} not exist`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to get like by id');
	}
};

const deleteLikeById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.likeRestaurant.findFirst(id);

		if (data) {
			await prisma.likeRestaurant.delete({
				where: {
					id: id,
				},
			});

			res.status(StatusCodes.OK).send(`Delete like ${id} successful`);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`Delete like ${id} failed`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to delete like by id');
	}
};

const updateLikeById = async (req, res) => {
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

export { createLike, getAllLike, getLikeById, deleteLikeById };
