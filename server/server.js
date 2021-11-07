const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const db = require('./config/connection')
const routes = require('./routes')
const port = process.env.PORT || 3001; 



app.use(
    cors({
    origin: '*',
    credentials: true
    })
)
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(routes)

db.once('open', () => {
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
    })
})