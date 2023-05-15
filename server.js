const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRouter = require('./routes/workoutRoutes');
const authRouter = require('./routes/authRoutes');

app.use(
	cors({
		origin: 'http://localhost:3000', // this could also be an array of allowed origins
	})
);
require('dotenv').config();
mongoose.set('strictQuery', false);

const PORT = 8000 || process.env.port;

app.use(express.json());
app.use('/', workoutRouter);
app.use('/auth', authRouter); // Добавляем маршруты для регистрации и входа
app.use('/workouts', workoutRouter); // Маршруты тренировок

mongoose
	.connect(process.env.MONGODB_LINK)
	.then(() => console.log(`Database connected`))
	.catch((err) => console.log(err));

app.use((err, req, res, next) => {
	console.error(err.stack); // Вывод ошибки в консоль


	res.status(500).send('Server Error'); // Отправка ответа с кодом ошибки
});

app.listen(PORT, () => {
	console.log(`I'm listening on PORT ${PORT}`);
});

