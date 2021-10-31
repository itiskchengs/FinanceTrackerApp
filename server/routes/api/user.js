const router = require('express').Router()
//const user = require('../../model/users')

router.get('/', async (req, res) => {
    res.json({name: "kyle", favoriteFood: "rice"})
})

module.exports = router;