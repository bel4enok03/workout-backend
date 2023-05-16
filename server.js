const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRouter = require('./routes/workoutRoutes');
const authRouter = require('./routes/authRoutes');

app.use(
	cors({
		origin: 'https://workouts-plan.netlify.app',
	})
);

require('dotenv').config();
mongoose.set('strictQuery', false);

const PORT = 8000 || process.env.port;

app.use(express.json());
app.use('/', workoutRouter);
app.use('/auth', authRouter);
app.use('/workouts', workoutRouter);

mongoose
	.connect(process.env.MONGODB_LINK)
	.then(() => console.log(`Database connected`))
	.catch((err) => console.log(err));

app.use((err, req, res, next) => {
	console.error(err.stack);

	res.status(500).send('Server Error');
});

app.listen(PORT, () => {
	console.log(`I'm listening on PORT ${PORT}`);
});
