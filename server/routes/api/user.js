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
    
        //Mongo preSchema function that uses Bcrypt to compare the password in the database and password submitted. 
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(isMatch) {
                const payload = {
                    email: req.body.email,
                }
                //Once the password is matched. Create a JWT Authentication token and assign the token to the users header.
                jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m' },
                    (err, token) => {
                        if(err) return res.json({message: err.message})
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

//Function to verify the JWT web token that the token is grabbed from the header. 
function verifyingJWT(req, res, next){
    const token = req.headers['x-access-token'];
    console.log(token);
    
    if(token){
        //If there is a token then run the JWT verify function if the function matches then send back the object of decoded information that you want to send back to the front end.
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err,decoded){
            if(err) return res.json({
                isLoggedIn: false,
                message: 'Failed To Authenticate'
            })
            req.user = {};
            req.user.email = decoded.email
            console.log(decoded);
            console.log(req.user.email);
            next()

        })
    } else {
        res.json({ message: 'Incorrect Token Given', isLoggedIn: false})
    }
}

//This endpoint gets called when the user logs in it runs the verify JWT function to make sure the JWT matches and is correct. 
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