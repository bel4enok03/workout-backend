const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
	type: { type: String, required: true },
	date: { type: Date, default: Date.now },
	duration: { type: Number, required: false },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Workout', WorkoutSchema);
