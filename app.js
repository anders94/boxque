/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , session = require('./routes/session.js')
    , http = require('http')
    , path = require('path')
    , socket = require('socket.io')
    , redis = require('redis')
    , uuid = require('node-uuid');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/session/create', session.create);
app.get(/^\/(\w+\-\w+\-\w+\-\w+\-\w+)$/, function(req, res) { // match URLs as chat IDs
        var key = req.params[0];
        res.render('session', {key: key});
    });

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// socket.io
io = socket.listen(server);
io.sockets.on('connection', function (socket) {
        console.log('Connection: ' + socket.id);

        var rc1 = redis.createClient();
        var rc2 = redis.createClient();
	var feed = '';
        socket.on('sub', function(key) {
                // enforce alphanumeric keys
                if (typeof key === 'string') {
                    if (key != '') {
			feed = 'feed.'+key;
       	                rc1.subscribe(feed);
                        console.log('sub: '+feed);
			var o = new Object();
			o.user = uuid.v4();
			socket.emit('id', o);
                    }
                    else
                        console.log('ERROR: illegal subscription '+key);
                }
                else
                    console.log('ERROR: illegal subscription '+key);

            });

        socket.on('post', function(data) {
		console.log('post: '+feed+' '+data);
		rc2.publish(feed, data);
            });

        rc1.on('message', function(key, data) {
		console.log('message: '+key+' '+data);
                socket.volatile.emit('message', data);
            });

        rc1.on('error', function(err) {
                console.log('Redis 1 Error: ' + err );
            });

        rc2.on('error', function(err) {
                console.log('Redis 2 Error: ' + err );
            });

    });
