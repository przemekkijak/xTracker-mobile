const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: {
            type: String, 
            required: true,
            minlength: [3, "Nazwa uzytkownika nie moze byc krotsza niz 3 znaki"],
            maxlength: [20],
            unique: true,
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true,
            validate: [validator.isEmail, 'Wrong email schema']
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 200,
        }

    }
)

module.exports = mongoose.model('user', User);