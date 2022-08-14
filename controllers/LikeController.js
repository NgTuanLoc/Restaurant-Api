import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

import { transformQuery } from '../utils/transformQuery.js';

const prisma = new PrismaClient();

const toggleLike = async (req, res) => {
	try {
		const { userId, restaurantId } = req.body;

		const existedLike = await prisma.likeRestaurant.findFirst({
			where: {
				restaurantId: restaurantId,
				userId: userId,
			},
		});

		if (existedLike) {
			await prisma.likeRestaurant.delete({
				where: {
					id: existedLike.id,
				},
			});
			res.status(StatusCodes.OK).send('dislike');
		} else {
			await prisma.likeRestaurant.create({
				data: { userId, restaurantId },
			});
			res.status(StatusCodes.OK).send('like');
		}
	} catch (error) {
		console.log(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Fail like restaurant');
	}
};

const getAllLike = async (req, res) => {
	const { restaurant, user } = req.query;

	const data = await prisma.likeRestaurant.findMany({
		where: {
			user: { fullName: transformQuery(user) },
			restaurant: {
				name: transformQuery(restaurant),
			},
		},
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

export { toggleLike, getAllLike, getLikeById, deleteLikeById };
