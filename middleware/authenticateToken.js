const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	jwt.verify(token, process.env.JWT_SECRET || 'my-default-secret-key', (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Token verification failed' });
		}

		req.user = user; // Присваиваем пользователя объекту запроса для последующего использования
		next();
	});
};

module.exports = authenticateToken;
