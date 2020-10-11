const express = require('express');

const HabitControl = require('../controllers/habit-ctrl');

const router = express.Router();

router.post('/getHabits', HabitControl.getHabits);
router.put('/updateHabit', HabitControl.updateHabit);
router.post('/createHabit', HabitControl.createHabit);
router.put('/completeHabit', HabitControl.completeHabit);

module.exports = router;