const WorkoutModel = require('../models/Workout');

module.exports.getWorkouts = async (req, res, next) => {
	try {
		const user = req.user.userId; 
		const workouts = await WorkoutModel.find({ user });
		res.send(workouts);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
};

module.exports.saveWorkout = async (req, res) => {
	try {
		const { type, date, duration } = req.body;
		const user = req.user.userId;
		const workout = await WorkoutModel.create({ type, date, duration, user });
		res.send(workout);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

module.exports.deleteWorkout = async (req, res) => {
	try {
		const { _id } = req.body;
        const user = req.user.userId; 


		await WorkoutModel.findOneAndDelete({ _id, user });
		res.send({ message: 'Deleted a workout', id: _id });
	} catch (error) {
		console.error(error.message);
		res.status(500).send({ message: 'Server error' });
	}
};

module.exports.editWorkout = async (req, res) => {
	try {
		const { _id, type, date, duration } = req.body;
		const user = req.user.userId;
		const updatedWorkout = await WorkoutModel.findOneAndUpdate(
			{ _id, user },
			{ type, date, duration },
			{ new: true }
		);
		res.send(updatedWorkout);
	} catch (error) {
		console.error(error.message);
		res.status(500).send({ message: 'Server error' });
	}
};
