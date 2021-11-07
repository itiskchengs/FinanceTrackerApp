const router = require('express').Router()
const { db } = require('../../model/users');
const userRoute = require('./user')

router.use('/users', userRoute)

module.exports = router;
