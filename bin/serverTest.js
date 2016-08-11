var app = require('express')();
var http = require('http').Server(app).listen(3000);
var io = require('socket.io')(http);
var path = require('path');
console.log('Server Started!');

var consul = require('consul')({
    host:"ec2-54-204-84-154.compute-1.amazonaws.com",
    port:80
});
console.log("consul connected");

app.get('/',function(req,res){
    //res.sendFile(__dirname+'/../public/tt_index.html');
    res.sendFile('tt_index.html', { root: path.join(__dirname, '../public') });
});

var wtch = consul.watch({
    method: consul.kv.get,
    options: {
        key: "test\/",
        recurse: true
    }
});
var lastConsulData = {};

io.on('connection',function(socket){
    console.log('User Connected!');

    socket.on('put',function(data){
        console.log('Recieved : '+data);

        broadcast(data);
    });

    socket.on('disconnect',function(){
        console.log('user is disconnected!');
    });

    //send initial chunk of data
    socket.emit('draw', lastConsulData);
    console.log("send init data: "+lastConsulData);
});

var broadcast = function(msg){
    io.emit('draw', msg)
}



wtch.on('change', function(data, msg, err) { //check on args
    console.log('\ndata:', data);
    console.log('\nerr:', err);


    // if (err) {
    //     console.error("ERROR:");
    //     console.error(err);
    //     return;
    // }
    io.emit('draw', data);
    lastConsulData = data;
    broadcast(data);
});

// setInterval(function() {
//     io.emit('sendres', new Date())
//     //socket.emit('sendres', new Date());
// }, 1 * 1000);
