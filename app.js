var express = require('express');
var app = express();
var mongoose = require('mongoose');
const cors = require('cors');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000

app.use(cors({
    origin: '*'
}));

app.set('view engine','ejs');


mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/angularJsNodeDEMC',{useNewUrlParser: true});

console.log("------------------- started");

apiController(app);
app.listen(port);