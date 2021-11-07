const router = require('express').Router()
const User = require('../../model/users')

router.get('/', async (req, res) => {
    let user = await User.find();
    res.send(user);
})

router.get('/news', async (req, res) => {
    User.findOne({ email: 'test@test.com' }, function(err, user){
       if(err) throw err;
       
       user.comparePassword('test123', function(err, isMatch){
           if (err) throw err;
           console.log('test123:', isMatch);
       })
       user.comparePassword('123test', function(err, isMatch) {
        if (err) throw err;
        console.log('123test:', isMatch); // -> 123Password: false
        });
    });
    
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
        res.status(200).send(user);
    }
})

module.exports = router;