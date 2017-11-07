var express = require('express');
var app = express();
var path = require('path');
var dist = __dirname + "/../client/dist/";
app.use(express.static(dist));

console.log(dist);



app.get('/', function (req, res) {
    res.sendFile(path.join(dist, 'index.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(dist, 'index.html'));
});

var server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Running on 8080');

}).on('error', (err) => {
    console.log(err);
});
