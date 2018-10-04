
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var db = null;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
    if(err) throw err;
    db = client.db("feed_hub");
    app.listen(8084);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/validateUser", function(req, res){
    
     db.collection('users', function (err, collection) {
        
         collection.find({$and:[{"username": req.body.username}, {"password": req.body.password}]}).toArray(function(err, data) {
            if(err) throw err;  
            if(data.length == 0){
                res.send({status: "Invalid User"})
            }
            else{
                res.send({status: "OK"})
            }         
        });
     });
});

app.post("/getProfileInfo", function(req, res){

     db.collection('users', function (err, collection) {
        
         collection.find({"username": req.body.username}).toArray(function(err, data) {
            if(err) throw err;  
            if(data.length == 0){
                res.send({data: "No Data"})
            }
            else{
                res.send(data[0])
            }         
        });
     });
});

app.post("/addUser", function(req, res){

    db.collection('users', function (err, collection) {
        
         collection.find({"username": req.body.username}).toArray(function(err, data) {
            if(err) throw err;  
            if(data.length != 0){
                res.send({status: "Username taken"})
                return
            }         
        });
     });

     var myobj = { "username": req.body.username, "password": req.body.password, "first_name": req.body.first_name, "last_name": req.body.last_name, "gender": req.body.gender, "dob": req.body.dob, "intro": req.body.intro, "profile_image": req.body.profile_image, "feeds": []};
     
     db.collection("users").insertOne(myobj, function(err, data) {
        if (err) throw err;
        res.send({status: "OK"});
      }); 
});

app.post("/addFeed", function(req, res){

     let selector = { "username": req.body.username };
     let value = { $push: {feeds: req.body.feed_url} }
     db.collection("users").update(selector, value, function(err, data) {
        if (err) throw err;
        res.send({status: "OK"});
      }); 

});



