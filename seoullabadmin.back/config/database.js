const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async () => {
	const mongoUri = process.env.MONGO_URI;
	try {
		await mongoose.connect(mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB에 성공적으로 연결되었습니다.');
	} catch (err) {
		console.error('MongoDB 연결 실패:', err);
	}
};
