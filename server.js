import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import UserRouter from './routes/UserRoute.js';
import RestaurantRouter from './routes/RestaurantRoute.js';
import LikeRouter from './routes/LikeRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
dotenv.config();
app.use(express.json());
app.use(morgan('tiny'));

// Routes
app.use('/api/v1', UserRouter);
app.use('/api/v1', RestaurantRouter);
app.use('/api/v1', LikeRouter);
app.use('/', (req, res) => {
	res.send('API');
});

const start = async (req, res) => {
	try {
		app.listen(PORT, () => {
			console.log(`Server is listening in Port ${PORT}`);
		});
	} catch (error) {
		console.log('🚀 ~ file: server.js ~ line 19 ~ start ~ error', error);
	}
};

start();
