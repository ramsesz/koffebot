// var Particle = require('particle-api-js');
var particle = new Particle();
var token = 'b373b7d323202577e2892b28cbd56464b1b4f7dc';
var DEVICE_ID = '3f0062000851353531343431';
var slackURL = 'https://hooks.slack.com/services/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';

var devicesPr = particle.listDevices({auth: token});

var potIsleeg = false;

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

var url = 'https://api.particle.io/v1/devices/' + DEVICE_ID + '/analogvalue';

var itvl;
var output = 0;
var offset = 1200;

function getPercentage(readVal) {


    var quotient = readVal / offset;
    quotient = Math.min(1.0, Math.max(0.0, quotient));
    var k = quotient * quotient * 100;

    return k;

    // var perc = Math.round(readVal / offset * 100);
    // return perc;
}

function notifySlack() {

    var data = {
        text: "WATER BIJVULLEN :facepunch:"
    };

    $.ajax({
        type: "POST",
        url: slackURL,
        data: JSON.stringify(data),
        processData: true,
    });
}

function startReading() {

    $('#btnToggle').html('KOFFEBOT IS GOING ...');
    processResult(offset);
    potIsleeg = false;
    if (itvl) {
        clearInterval(itvl);
    }
    itvl = setInterval(function () {
        var data = {
            access_token: token
        };

        $.getJSON(url, data, function (data) {
            if (!isNaN(data.result)) {


                processResult(data.result);


            }
        });
    }, 1000);
}

function processResult(dataResult) {

    var perc = getPercentage(dataResult);
    output = Math.round(perc) + '%';
    if (perc < 10 && !potIsleeg) {
        potIsleeg = true;
        notifySlack();
        $('#percVal').addClass('leeg');
        $('#readVal').addClass('leeg');
    } else {
        $('#percVal').removeClass('leeg');
        $('#readVal').removeClass('leeg');
    }
    $('#percVal').html(output);
    $('#readVal').html(dataResult);
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


