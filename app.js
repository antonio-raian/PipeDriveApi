'use strict'

// require express and bodyParser
const  express = require("express");
const  bodyParser = require("body-parser");

// Import DB Connection
require("./config/database");

// create express app
const  app = express();

// define port to run express app
const  port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//Routes
app.get('/', (req, res) => {
    res.send('You are on PipeBlingApi')
});
// Listen to server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})