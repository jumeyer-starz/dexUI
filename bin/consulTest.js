/**
 * Created by justin on 8/5/16.
 */



console.log("Starting test script");

var consul = require('consul')({
    host:"ec2-54-204-84-154.compute-1.amazonaws.com",
    port:80
});

//consul.acl.

// consul.acl.create(function(err, result) {
//     console.log("consul created");
//     if (err) throw err;
// });


var wtch = consul.watch({
    method: consul.kv.get,
    options: {
        key: "test\/",
        recurse: true

    }
});

wtch.on('change', function(data, err) {
    console.log('\ndata:', data);
    console.log('\nerr:', err);

    console.log('\n');

    if (err) {
        console.error("ERROR:");
        console.error(err);

        return;
        //return self._err(err, res);
    }

    // consul.kv.get({recurse:true}, function(err, result) {
    //     if (err) throw err;
    //
    //     console.log(result);
    // });
});

wtch.on('error', function(err) {
    console.log('error:', err);
    //console.log('res:', res);
});


consul.health.state('critical', function(err, result) {
    if (err) throw err;
});


// setInterval(function() {
//     console.log(new Date());
// }, 1 * 1000);


