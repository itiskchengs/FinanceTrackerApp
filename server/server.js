const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const db = require('./config/connection')
const routes = require('./routes')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001; 
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
require('dotenv').config()


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

/*TESTING PLAID API HERE*/

const configuration = new Configuration ({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: { 
        headers: { 
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET
        }
    }
})



db.once('open', () => {
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
    })
})