// import app from './';

// app.use((err, req, res, next) => {
// 	if (err.code !== 'EBADCSRFTOKEN') return next(err);
// 	res.status(403).send('Invalid CSRF token');
// });

// app.listen(PORT, () => {
// 	console.log(`Server running on http://localhost:${PORT}`);
// });

import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(
	cors({
		credentials: true,
	}),
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}/`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI_LOGIN);
mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error));

app.use('/', router());
