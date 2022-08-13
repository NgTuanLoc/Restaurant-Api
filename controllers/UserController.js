import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createUser = async (req, res) => {
	try {
		const { firstName, lastName } = req.body;
		const data = await prisma.users.create({
			data: { firstName, lastName },
		});
		res.status(200).send(data);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getAllUser = async (req, res) => {
	const data = await prisma.users.findMany();
	res.status(200).send(data);
};

const getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const data = await prisma.users.findFirst({
			where: {
				id: id,
			},
		});
		if (data) {
			res.status(200).send(data);
		} else {
			res.status(500).send(`User ${id} not exist`);
		}
	} catch (error) {
		res.status(500).send('Fail to get user by id');
	}
};

const deleteUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.users.findFirst(id);

		if (data) {
			await prisma.users.delete({
				where: {
					id: id,
				},
			});

			res.status(200).send(`Delete user ${id} successful`);
		} else {
			res.status(500).send(`Delete user ${id} failed`);
		}
	} catch (error) {
		res.status(500).send('Fail to delete user by id');
	}
};

const updateUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const { firstName, lastName } = req.body;
		const data = await prisma.users.findFirst(id);

		if (data) {
			await prisma.users.update({
				where: { id: id },
				data: {
					firstName,
					lastName,
				},
			});
			res.status(200).send(`Update User ${id} successful`);
		} else {
			res.status(500).send(`Update user ${id} failed`);
		}
	} catch (error) {
		console.log(
			'🚀 ~ file: UserController.js ~ line 72 ~ updateUserById ~ error',
			error
		);
		res.status(500).send('Fail to update user by id');
	}
};

export { createUser, getAllUser, getUserById, deleteUserById, updateUserById };
