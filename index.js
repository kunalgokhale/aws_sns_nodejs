const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let smsRoute = require('./routes/sms_route');
app.use(smsRoute);

app.listen(PORT, () => console.log('SMS Service Listening on PORT ' + PORT))