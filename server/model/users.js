const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    email: { type: String, required: true, index: {unique: true }},
    password: { type: String, required: true }
},{timestamps: true})

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

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = model ('Users', userSchema);

module.exports = User;