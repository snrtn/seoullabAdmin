const app = require('./app');
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
	if (err.code !== 'EBADCSRFTOKEN') return next(err);
	res.status(403).send('Invalid CSRF token');
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
