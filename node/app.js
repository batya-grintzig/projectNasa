const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./router/api')
const dotenv = require('dotenv')
dotenv.config()
const cors=require('cors')
app.use(cors())
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log("error: " + err);
    })
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))
app.use('/', router)

app.listen('3400', () => {
    console.log("lisening");
})