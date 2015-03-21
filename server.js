var express        = require('express');
var app            = express();                     // create app with express
var mongoose       = require('mongoose');           // mongoose for mongodb
var port           = process.env.PORT || 8080;      // set the port
var database       = require('./config/database');  // load the database config
var morgan         = require('morgan');             // log requests to console
var bodyParser     = require('body-parser');        // pull information from HTML POST
var methodOverride = require('method-override');    // simulate DELETE and PUT

mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));                                         // log every request to console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

require('./app/routes.js')(app);

app.listen(port);
console.log("Listening on port " + port);