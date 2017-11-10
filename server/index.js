var express = require('express');
var app = express();
var path = require('path');
var dist = __dirname + "/../client/dist/";
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passhash = require('./passhash');


var secretKey = "kafornokka";

app.use(express.static(dist));
app.use(bodyParser.json());
var tokens = [];
console.log(dist);


app.post('/login',(req,res)=>{
    console.log(req.body);
    res.json(req.body);
    let hash = passhash.sha512(req.body.password,passhash.random(20));
    console.log(hash);
});

app.get('/authorize',(req,res)=>{
    verifyToken(req,(err,decoded)=>{
       if(err){
           res.sendStatus(403);
       }else{
           res.sendStatus(200);
       }
    });
});



app.get('/testToken',(req,res)=>{
    let urlObject = {email:"testmail",password:"testPassword"};
    let jwtToken = jwt.sign(urlObject, secretKey, { expiresIn: 18000 });
    res.json({token:jwtToken});
});

function verifyToken(req, verified) {
    let token = req.headers.Bearer.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        verified(err, decoded);
    });
}



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
