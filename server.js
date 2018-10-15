// Express Server for running app pn local server
var express = require("express");
//MongooseDB for holding information in Database
var mongoose = require("mongoose");
//Express Handlebars for Views
var exphbs = require('express-handlebars');

// HTTP request logger middleware for node.js
// var logger = require('morgan')

// Use morgan logger for logging requests
// app.use(logger("dev"));

var PORT = 3000;

// Initialize the Express Server
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scrapeInfo", {
    useNewUrlParser: true
});

// Set up Handlebars/View Engine
app.set('views', './views');

app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Routes
require("./routes/scrapeRoutes")(app);


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

module.exports=app;