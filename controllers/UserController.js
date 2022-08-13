import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

const createUser = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
		const data = await prisma.user.create({
			data: { fullName, email, password },
		});
		res.status(StatusCodes.OK).send(data);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Fail to create user');
	}
};

const getAllUser = async (req, res) => {
	const data = await prisma.user.findMany({
		include: {
			Food: true,
			Order: true,
			RatingRestaurant: true,
			LikeRestaurant: true,
		},
	});
	res.status(200).send(data);
};

const getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const data = await prisma.user.findFirst({
			where: {
				id: id,
			},
		});
		if (data) {
			res.status(StatusCodes.OK).send(data);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`User ${id} not exist`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to get user by id');
	}
};

const deleteUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.user.findFirst(id);

		if (data) {
			await prisma.user.delete({
				where: {
					id: id,
				},
			});

			res.status(StatusCodes.OK).send(`Delete user ${id} successful`);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`Delete user ${id} failed`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to delete user by id');
	}
};

const updateUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const { fullName, email, password } = req.body;
		const data = await prisma.user.findFirst(id);

		if (data) {
			await prisma.user.update({
				where: { id: id },
				data: {
					fullName,
					email,
					password,
				},
			});
			res.status(StatusCodes.OK).send(`Update User ${id} successful`);
		} else {
			res.status(StatusCodes.NOT_FOUND).send(`Update user ${id} failed`);
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('Fail to update user by id');
	}
};

export { createUser, getAllUser, getUserById, deleteUserById, updateUserById };
