var express = require('express');
var app = express();
var path = require('path');
var dist = __dirname + "/../client/dist/";
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passhash = require('./passhash');
var mongoose = require("mongoose");
var Drink = require('./models/drink');
var User = require('./models/user');


var secretKey = "kafornokka";

app.use(express.static(dist));
app.use(bodyParser.json());
var tokens = [];
console.log(dist);



let db = mongoose.connect('mongodb://localhost/putin',(err)=>{
    if(err){
     console.log(err);
    }else{
        console.log("Connected to the database");
    }    
});



app.post('/login',(req,res)=>{
    let hash = passhash.sha512(req.body.password,passhash.random(20));
    User.find({
        email:req.body.email
    },(err,userRes)=>{
        if(err){
            console.log("Error :(");
        }else{
            userRes = userRes[0]
            let hash = passhash.sha512(req.body.password,userRes.salt);
            if(hash.passwordHash==userRes.password){
                console.log("Found user");
                let urlObject = {
                    firstName:userRes.firstName,
                    lastName:userRes.lastName,
                    email:userRes.email,
                    favouriteDrinks:userRes.favouriteDrinks,
                    createdDrinks:userRes.createdDrinks
                }
                
                let jwtToken = jwt.sign(urlObject, secretKey, { expiresIn: 18000 });
                res.json({token:jwtToken});
            }
        }
    });
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

app.get('/drink',(req,res)=>{
    
});

app.post('/register',(req,res)=>{
    let hash = passhash.sha512(req.body.password,passhash.random(20));
    let user = new User({
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        password:hash.passwordHash,
        salt:hash.salt,
        email:req.body.email
    })
    user.save((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Saved");
        }
    })
    res.sendStatus(200);
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
