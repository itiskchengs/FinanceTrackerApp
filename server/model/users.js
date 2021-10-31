const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
})

const User = model ('Users', userSchema);

module.exports = User;