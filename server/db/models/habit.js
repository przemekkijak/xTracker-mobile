const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)

const Habit = new Schema(
    {
        name: {type: String, required: true},
        startAt: {type: Date, default: Date.now},
        duration: {type: Number, required: true},
        progress: {type: Array},
        creatorID: {type: String, required: true},
        color: {type: String, validator: [colorValidator, 'Invalid color'], required: true},
    },
    {timestamps: true},
)

module.exports = mongoose.model('habit', Habit)