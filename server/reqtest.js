var request = require('request');

var options = {
    url: 'http://ec2-54-224-110-172.compute-1.amazonaws.com/dude',
    headers: {
        'User-Agent': 'request',
        'Host':'ec2-54-224-110-172.compute-1.amazonaws.com'
    },
    followRedirect: false
};

request.get(options,
    function(err, res, body){
        console.warn( res.headers["x-ruleid"] );
    }
);