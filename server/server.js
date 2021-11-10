const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const db = require('./config/connection')
const routes = require('./routes')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001; 


app.use(cors({
    "origin": "*",
    "preflightContinue": true,
    "optionsSuccessStatus": 204,
    "credentials": true, 
    "methods": ['GET', 'PUT', 'POST', 'DELETE'],
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.json());
app.use(routes)

db.once('open', () => {
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
    })
})