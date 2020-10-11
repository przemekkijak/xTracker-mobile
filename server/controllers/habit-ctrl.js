const Habit = require('../db/models/habit');



createHabit = (req, res) => {
    const body = req.body;

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a habit',
        });
    }

const habit = new Habit(body);

    if(!habit) {
        return res.status(400).json({ success: false, error: err});
    }

    habit
    .save()
    .then(() => {
        return res.status(201).json({
            success: true,
            id: habit._id,
            message: 'Habit created'
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Habit not created!',
        })
    })

}

updateHabit = async (req, res) => {
    if(!req.body) {
        return res.status(400).json({
            success: false,
            message: 'You must provide a habit body to update!',
        })
    }

    Habit.findOne({_id: req.body.id}, (err, habit) => {
        if(err) {
            return res.status(400).json({
                err,
                message: 'Habit not found',
            })
        }
        const props = {
            name: req.body.name,
            startAt: req.body.startAt, 
            duration: req.body.duration,
            progress: req.body.progress
        }
        for(let i in props) {
            if(props[i] !== undefined || props[i] !== null) {
                habit[i] = props[i];
            }
        }
        habit.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                message: 'Habit updated!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Habit not updated',
            })
        })

        
    })
}

getHabits = async(req, res) => {
    console.log('Trying to get habits for ' + req.body.usrID);
    await Habit.find({creatorID: req.body.userID}, (err, habits) => {
        if (err) {
            return res.status(200).json({success: false, error: err})
        }
        if(!habits.length) {
            return res.status(200).json({success: false, error: 'Habits not found'})
        }
        return res.status(200).json({ success: true, habits: habits})
    }).catch(err => console.log('Blad' + error));
}

completeHabit = async(req,res) => {
    let todayDate = new Date().toISOString().split('T')[0];
    if(!req.body) {
        return res.status(400).json({
            success: false,
            message: 'You must provide a habit body to complete habit',
        });
    }

    Habit.findOne({_id: req.body.id}, (err, habit) => {
        if(err) {
            return res.status(400).json({
                err,
                message: 'Habit not found',
            });
        }
        if(!habit.progress.includes(todayDate)) {
            habit.progress.push(todayDate);
            habit.save()
            .then((res) => {
                return res.status(200).json({
                    message: 'Habit completed',
                })
            })
            .catch((error) => {
                console.log(error);
            })
        }
    })
}


module.exports = {
    createHabit,
    updateHabit,
    getHabits,
    completeHabit,
}