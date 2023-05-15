// authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	try {
		const { username, password } = req.body;

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: 'Username already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({ username, password: hashedPassword });

		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: 'Server error' });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'my-default-secret-key');

		res.json({ token });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { register, login };
