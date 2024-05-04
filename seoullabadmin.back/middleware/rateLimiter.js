const rateLimitWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 10;

const requestCounts = new Map();

function rateLimiter(req, res, next) {
	const ip = req.ip;
	const now = Date.now();
	const requestInfo = requestCounts.get(ip) || { count: 0, startTime: now };

	if (now > requestInfo.startTime + rateLimitWindowMs) {
		requestCounts.set(ip, { count: 1, startTime: now });
		next();
	} else {
		if (requestInfo.count >= maxRequestsPerWindow) {
			return res
				.status(429)
				.json({ success: false, message: 'Too many requests from this IP, please try again later.' });
		}
		requestInfo.count += 1;
		requestCounts.set(ip, requestInfo);
		next();
	}
}

module.exports = rateLimiter;
