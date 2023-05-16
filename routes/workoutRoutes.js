const express = require('express');
const router = express.Router();
const { getWorkouts, saveWorkout, deleteWorkout, editWorkout } = require('../controlles/workoutController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, getWorkouts);
router.post('/saveWorkout', authenticateToken, saveWorkout);
router.delete('/deleteWorkout', authenticateToken, deleteWorkout);
router.post('/editWorkout', authenticateToken, editWorkout);

module.exports = router;
