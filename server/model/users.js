const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Model for users for email and password and adds a timestamp.
const userSchema = new Schema({
    email: { type: String, required: true, index: {unique: true }},
    password: { type: String, required: true }
},{timestamps: true})

//This pre runs before the model is added to the database and bcrypts the password before its added in.
userSchema.pre('save', function(next){ 
    let user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next (err);

            user.password = hash;
            next();
        })
    })

});

//Models compare password method to be used to compare the two bcrypt password one from database and from client side.
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = model ('Users', userSchema);

module.exports = User;