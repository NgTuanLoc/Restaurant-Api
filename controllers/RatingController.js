import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

const toggleRating = async (req, res) => {
	try {
		const { userId, restaurantId, amount } = req.body;
		const data = await prisma.ratingRestaurant.findFirst({
			where: {
				userId,
				restaurantId,
			},
		});

		if (!data) {
			await prisma.ratingRestaurant.create({
				data: { userId, restaurantId, amount },
			});
			res.status(StatusCodes.OK).send('Create rating successful');
			return;
		}
		await prisma.ratingRestaurant.delete({
			where: {
				id: data.id,
			},
		});
		res.status(StatusCodes.OK).send('Remove rating successful');
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail Rating restaurant');
	}
};

const getAllRating = async (req, res) => {
	const data = await prisma.RatingRestaurant.findMany({
		include: {
			user: true,
			restaurant: true,
		},
	});
	res.status(200).send(data);
};

const getRatingById = async (req, res) => {
	try {
		const { id } = req.params;

		const data = await prisma.ratingRestaurant.findFirst({
			where: {
				id: id,
			},
		});
		if (data) {
			res.status(StatusCodes.OK).send(data);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`Rating ${id} not exist`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to get Rating by id');
	}
};

const deleteRatingById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.ratingRestaurant.findFirst(id);

		if (data) {
			await prisma.RatingRestaurant.delete({
				where: {
					id: id,
				},
			});

			res.status(StatusCodes.OK).send(`Delete Rating ${id} successful`);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`Delete Rating ${id} failed`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to delete Rating by id');
	}
};

const updateRatingById = async (req, res) => {
	try {
		const { id } = req.params;
		const { amount } = req.body;
		const data = await prisma.ratingRestaurant.findFirst(id);

		if (data) {
			await prisma.ratingRestaurant.update({
				where: { id: id },
				data: {
					amount: Number(amount),
				},
			});
			res.status(StatusCodes.OK).send(`Update rating ${id} successful`);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`Update rating ${id} failed`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to update rating by id');
	}
};

export {
	toggleRating,
	getAllRating,
	getRatingById,
	deleteRatingById,
	updateRatingById,
};
