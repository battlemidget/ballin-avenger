
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

var oneDay = 86400000;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('the cow rises at noon to eat grass.'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// We only care about hosting the javascript frontend code from nodejs.
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
