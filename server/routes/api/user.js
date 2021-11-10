require('dotenv').config()
const jwt = require('jsonwebtoken');
const router = require('express').Router()
const User = require('../../model/users')

//Post request to verify and check if a user and passord match to log them in
router.post('/signin', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
        if(!user){
            return res.json({ 
                message: 'Invalid'
            })
        }

        user.comparePassword(req.body.password, function(err, isMatch) {
            if(isMatch) {
                const payload = {
                    email: req.body.email,
                }
                jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m' },
                    (err, token) => {
                        if(err) return res.json({message: err.message})
                       // res.header({
                        //    "x-access-token": 'Bearer' + token,
                        //})
                        return res.json({
                            message: 'Success', 
                            token: token,
                        })
                    }
                    )
            } else {
                return res.json({ 
                    message: "Invalid Username or Password"
                })
        }
    })
})

/*
function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]
    console.log(token);
    
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.json({ 
                isLoggedIn: false,
                message: "Failed To Authenticate"
            })
            req.email = {};
            req.body.email = decoded.email
            next()
        })
    } else {
        res.json( {message: "Incorrect Token Give", isLoggedIn: false})
    }
}*/

function verifyingJWT(req, res, next){
    const token = req.headers['x-access-token'];
    console.log(token);

    if(token){
        //res.json({isLoggedIn: true})
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err,decoded){
            if(err) return res.json({
                isLoggedIn: false,
                message: 'Failed To Authenticate'
            })
            //res.json({isLoggedIn: true})
            req.user = {};
            req.user.email = decoded.email
            //req.user.experation = decoded.
            console.log(decoded);
            console.log(req.user.email);
            var decoded = jwt.decode(token, {complete: true});
            console.log(decoded.header);
            console.log(decoded.payload);
            next()

        })
    } else {
        res.json({ message: 'Incorrect Token Given', isLoggedIn: false})
    }
}



router.get('/getUsername', verifyingJWT, (req, res) => {
    return res.status(200).json({isLoggedIn: true, email: req.body.email})
})

//Post request to grab the user sign up information and saves in the server. 
router.post('/signup', async (req, res) => {
    
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