
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var consul = require('consul')({
    host:"ec2-54-204-84-154.compute-1.amazonaws.com", //FIXME: dont hard code this
    port:80
    //host:"localhost",
    //port:8500
});

var routes = require('./routes/index');
//var users = require('./routes/users');



 // var express = require('express')
 //     , app = express()
 //    , server = require('http').Server(express()).listen(3000)
 //    , io = require('socket.io')(server);
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
http.listen(4000);

io.on('connection', function (socket) {
    console.log('User Connected!');
});



var broadcast = function(msg){
    console.warn("braodcasting");
    io.emit('draw', msg)
}




var wtch = consul.watch({
    method: consul.kv.get,
    options: {
        key: "redirects\/",
        recurse: true
    }
});
var lastConsulData = {};
wtch.on('change', function(data, msg, err) { //check on args
    console.warn('\n ndata:', data);

    if (err) {
        console.error("ERROR:");
        console.error(err);
        return;
    }

    io.emit('draw', data);
    lastConsulData = data;
    broadcast(data);
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
//app.use('/socket.io', socket);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found!! ' + req.originalUrl);
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

module.exports = app;
