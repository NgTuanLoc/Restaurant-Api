import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import UserRouter from './routes/UserRoute.js';
import RestaurantRouter from './routes/RestaurantRoute.js';
import LikeRouter from './routes/LikeRoute.js';
import RatingRouter from './routes/RatingRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
dotenv.config();
app.use(express.json());
app.use(morgan('tiny'));

// Routes
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/restaurant', RestaurantRouter);
app.use('/api/v1/like', LikeRouter);
app.use('/api/v1/rating', RatingRouter);

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
