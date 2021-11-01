const router = require('express').Router()
const User = require('../../model/users')

router.get('/', async (req, res) => {
    let user = await User.find();
    res.send(user);
})

router.post('/', async (req, res) => {
    
    //Check if the user exists already
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).send('The user already exisits!');
    } else {
        user = new User({
            email:  req.body.email,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    }
})

module.exports = router;