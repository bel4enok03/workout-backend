const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRouter = require('./routes/workoutRoutes');
const authRouter = require('./routes/authRoutes');

require('dotenv').config();
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 8000;

app.use(
	cors({
		origin: 'https://workouts-plan.netlify.app',
	})
);
app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'https://workouts-plan.netlify.app');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use('/auth', authRouter);
app.use('/workouts', workoutRouter);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Server Error');
});

mongoose
	.connect(process.env.MONGODB_LINK)
	.then(() => console.log(`We were connected to Mongo`))
	.catch((err) => console.log(err));


app.listen(PORT, () => {
	console.log(`I'm listening on PORT ${PORT}`);
});
