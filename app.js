// var Particle = require('particle-api-js');
var particle = new Particle();
var token = 'b373b7d323202577e2892b28cbd56464b1b4f7dc';
var DEVICE_ID = '3f0062000851353531343431';

var devicesPr = particle.listDevices({auth: token});

devicesPr.then(
    function (devices) {
        console.log('Devices: ', devices);
    },
    function (err) {
        console.log('List devices call failed: ', err);
    }
);


var color = 'red';

function ledToggle() {
    color = (color == 'red') ? 'blue' : 'red';
    var fnPr = particle.callFunction({deviceId: DEVICE_ID, name: 'ledToggle', argument: color, auth: token});

    fnPr.then(
        function (data) {
            console.log('Function called succesfully:', data);
        }, function (err) {
            console.log('An error occurred:', err);
        });

}

var url = 'https://api.particle.io/v1/devices/' + DEVICE_ID + '/analogvalue?access_token=' + token;

var itvl;

function startReading () {
    itvl = setInterval(function () {
        var data = {
            access_token: token
        };

        $.getJSON( url, function( data ) {
                console.log(data);

                $('#readVal').html(data.result);
        });
    }, 1000);
}


function ledToggle() {
    color = (color == 'red') ? 'blue' : 'red';
    var fnPr = particle.callFunction({deviceId: DEVICE_ID, name: 'read', argument: color, auth: token});

    fnPr.then(
        function (data) {
            console.log('Function called succesfully:', data);
        }, function (err) {
            console.log('An error occurred:', err);
        });

}


// particle.login({username: 'tjoener@gmail.com', password: 'pass'}).then(
//     function(data) {
//         token = data.body.access_token;
//     },
//     function (err) {
//         console.log('Could not log in.', err);
//     }
// );



