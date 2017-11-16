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
                let urlObject = {
                    _id:userRes._id,
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
           console.log(err);
           res.sendStatus(403);
       }else{
           res.json({status:200,message:"Authorized"});
       }
    });
});

app.post('/drink',(req,res)=>{
    let self = this;
    verifyToken(req,(err,decoded)=>{
        if(err){
            res.sendStatus(403);
        }else{
            let drink = new Drink({
                name:req.body.name,
                description:req.body.description,
                image:req.body.image,
                glass:req.body.glass,
                ingredients:req.body.ingredients,
                recipe:req.body.recipe,
                author:decoded._id
            });
            drink.save((err,document)=>{
                if(err){
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    User.findOne({email:decoded.email},(err,userRes)=>{
                        if(err){
                            res.sendStatus(404);
                        }else{
                            userRes.createdDrinks.push(document._id);
                            userRes.save((err,revisedRes)=>{
                                if(err){
                                    console.log(err);
                                    res.sendStatus(500);
                                }else{
                                    let urlObject = {
                                        _id:revisedRes._id,
                                        firstName:revisedRes.firstName,
                                        lastName:revisedRes.lastName,
                                        email:revisedRes.email,
                                        favouriteDrinks:revisedRes.favouriteDrinks,
                                        createdDrinks:revisedRes.createdDrinks
                                    }
                                    let jwtToken = jwt.sign(urlObject, secretKey, { expiresIn: 18000 });
                                    res.json({token:jwtToken});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

app.post('/register',(req,res)=>{
    let hash = passhash.sha512(req.body.password,passhash.random(20));
    let user = new User({
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        password:hash.passwordHash,
        salt:hash.salt,
        email:req.body.email
    });
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
    let token = req.headers.authorization.split(" ")[1];
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
