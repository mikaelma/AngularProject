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


let db = mongoose.connect('mongodb://localhost/putin', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});


app.post('/login', (req, res) => {
    User.find({
        email: req.body.email
    }, (err, userRes) => {
        if (err) {
            console.log("Error :(");
        } else if (userRes[0]) {
            userRes = userRes[0]
            let hash = passhash.sha512(req.body.password, userRes.salt);
            if (hash.passwordHash == userRes.password) {
                let urlObject = {
                    _id: userRes._id,
                    firstName: userRes.firstName,
                    lastName: userRes.lastName,
                    email: userRes.email,
                    favouriteDrinks: userRes.favouriteDrinks,
                    createdDrinks: userRes.createdDrinks
                };
                let jwtToken = jwt.sign(urlObject, secretKey, {expiresIn: 18000});
                console.log(jwtToken);
                res.json({token: jwtToken});

            }else{
                res.json({status: 403});
            }
        }else {
            console.log("No user found");
            res.json({status: 404});
        }
    });
});

app.get('/authorize', (req, res) => {
    verifyToken(req, (err, decoded) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            res.json({status: 200, message: "Authorized"});
        }
    });
});

app.get('/drinks/:skip', (req, res) => {
    let self = this;
    let skip = parseInt(req.params.skip);
    Drink.find({}, (err, drinks) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(drinks);
        }
    }).skip(skip).limit(12);
});

app.get('/searchDrinks/:name', (req, res) => {
    let self = this;
    let name = req.params.name;
    Drink.find({name: {$regex: ".*" + name + ".*", '$options': 'i'}}, (err, drinks) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(drinks);
        }
    });
});

app.post('/favouriteDrink', (req, res) => {
    let self = this;
    verifyToken(req, (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let id = req.body.id;
            User.findOne({email: decoded.email}, (err, userRes) => {
                if (err) {
                    res.sendStatus(404);
                } else {

                    if(req.body.isAdd === true){
                        userRes.favouriteDrinks.push(id);
                        userRes.save((err, revisedRes) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            } else {
                                let urlObject = {
                                    _id: revisedRes._id,
                                    firstName: revisedRes.firstName,
                                    lastName: revisedRes.lastName,
                                    email: revisedRes.email,
                                    favouriteDrinks: revisedRes.favouriteDrinks,
                                    createdDrinks: revisedRes.createdDrinks
                                };
                                let jwtToken = jwt.sign(urlObject, secretKey, {expiresIn: 18000});
                                res.json({token: jwtToken});
                            }
                        });
                    }else{
                        var localIndex = userRes.favouriteDrinks.indexOf(id);
                        userRes.favouriteDrinks.splice(localIndex, 1);
                        userRes.save((err, revisedRes) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            } else {
                                let urlObject = {
                                    _id: revisedRes._id,
                                    firstName: revisedRes.firstName,
                                    lastName: revisedRes.lastName,
                                    email: revisedRes.email,
                                    favouriteDrinks: revisedRes.favouriteDrinks,
                                    createdDrinks: revisedRes.createdDrinks
                                }
                                let jwtToken = jwt.sign(urlObject, secretKey, {expiresIn: 18000});
                                res.json({token: jwtToken});
                            }
                        });
                    }

                }
            });
        }
    });
});

app.post('/drink', (req, res) => {
    let self = this;
    verifyToken(req, (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            console.log(req.body.ingredients);
            let drink = new Drink({
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                glass: req.body.glass,
                ingredients: req.body.ingredients,
                recipe: req.body.recipe,
                authorId: decoded._id,
                authorName: decoded.firstName + " " + decoded.lastName
            });
            drink.save((err, document) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    User.findOne({email: decoded.email}, (err, userRes) => {
                        if (err) {
                            res.sendStatus(404);
                        } else {
                            userRes.createdDrinks.push(document._id);
                            userRes.save((err, revisedRes) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                } else {
                                    let urlObject = {
                                        _id: revisedRes._id,
                                        firstName: revisedRes.firstName,
                                        lastName: revisedRes.lastName,
                                        email: revisedRes.email,
                                        favouriteDrinks: revisedRes.favouriteDrinks,
                                        createdDrinks: revisedRes.createdDrinks
                                    }
                                    let jwtToken = jwt.sign(urlObject, secretKey, {expiresIn: 18000});
                                    res.json({token: jwtToken});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

app.get('/userDrinks', (req, res) => {
    verifyToken(req, (err, decoded) => {
        Drink.find({author: decoded._id}, (err, queryRes) => {
            if (err) {
                res.json({
                    status: 500,
                    message: "Error on query for drinks created by user " + decoded.email + " with id " + decoded._id
                });
            } else {
                res.json(queryRes);
            }
        });
    });
});

app.post('/register', (req, res) => {
    console.log(req.body);
    let hash = passhash.sha512(req.body.password, passhash.random(20));
    let user = new User({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        password: hash.passwordHash,
        salt: hash.salt,
        email: req.body.user.email
    });
    user.save((err, doc) => {
        if (err) {
            console.log(err);
            res.json({status: 500, message: "Error while trying to save document"});
        } else {
            console.log("Saved");
            let urlObject = {
                _id: doc._id,
                firstName: doc.firstName,
                lastName: doc.lastName,
                email: doc.email,
                favouriteDrinks: doc.favouriteDrinks,
                createdDrinks: doc.createdDrinks
            }
            let token = jwt.sign(urlObject, secretKey, {expiresIn: 18000});
            res.json({token: token});
        }
    })
});


app.get('/testToken', (req, res) => {
    let urlObject = {email: "testmail", password: "testPassword"};
    let jwtToken = jwt.sign(urlObject, secretKey, {expiresIn: 18000});
    res.json({token: jwtToken});
});

function verifyToken(req, verified) {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        verified(err, decoded);
    });
}

app.post('/passwordReset', (req, res) => {

    verifyToken(req, (err, decoded) => {
        console.log(req.body.newPassword);
        if (err) {
            res.json({status: 403, message: "Unauthorized attempt at password reset"});
        } else {
            User.find({email: decoded.email}, (err, queryRes) => {
                queryRes = queryRes[0];
                if (err) {
                    res.json({status: 500, message: "Something went wrong while trying to query for document"});
                } else {
                    let hash = passhash.sha512(req.body.password, queryRes.salt);
                    console.log(queryRes.password);
                    console.log(hash.passwordHash);
                    if (queryRes.password == hash.passwordHash) {
                        hash = passhash.sha512(req.body.newPassword, passhash.random(20));
                        queryRes.password = hash.passwordHash;
                        queryRes.salt = hash.salt;
                        queryRes.save((err, doc) => {
                            if (err) {
                                res.json({status: 500, message: "Error saving the new user"});
                            } else {
                                let urlObject = {
                                    _id: doc._id,
                                    firstName: doc.firstName,
                                    lastName: doc.lastName,
                                    email: doc.email,
                                    favouriteDrinks: doc.favouriteDrinks,
                                    createdDrinks: doc.createdDrinks
                                }
                                let token = jwt.sign(urlObject, secretKey, {expiresIn: 18000});
                                res.json({token: token});
                            }
                        })
                    } else {
                        res.json({status: 403, message: "Unauthorized, passwords do not match"});
                    }
                }
            });
        }
    });
})

app.get('/findDrink/:id', (req, res) => {
    let id = req.params.id;
    Drink.find({_id: id}, (err, doc) => {
        if (err) {
            res.json({status: 500, message: "Coudld not retrieve drink from database"});

        } else {
            doc = doc[0];
            console.log(doc);
            res.json({
                _id: doc._id,
                name: doc.name,
                description: doc.description,
                image: doc.image,
                glass: doc.glass,
                ingredients: doc.ingredients,
                recipe: doc.recipe,
                authorId: doc.authorId,
                authorName: doc.authorName
            })
        }
    });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(dist, 'index.html'));
});

app.get('/createdDrinks', (req, res) => {
    verifyToken(req, (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Drink.find({authorId: decoded._id}, (err, queryRes) => {
                if (err) {
                    res.json({status: 500, message: "Error while trying to find any drinks"});
                } else {
                    res.json(queryRes);
                }
            });
        }
    })
});

app.get('/getFavouriteDrinks', (req, res) => {
    verifyToken(req, (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Drink.find({_id: {$in: decoded.favouriteDrinks }}, (err, queryRes) => {
                if (err) {
                    res.json({status: 500, message: "Error while trying to find any drinks"});
                } else {
                    res.json(queryRes);
                }
            }).sort({name: 1});
        }
    })
});

app.get('*', function (req, res) {
    res.sendFile(path.join(dist, 'index.html'));
});


var server = app.listen(8084, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Running on 8080');

}).on('error', (err) => {
    console.log(err);
});
