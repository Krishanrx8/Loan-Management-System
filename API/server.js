const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors());
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://Dimuth:z9wn0fBpJEgTHBXI@ac-xjhhhyo-shard-00-00.quiz4be.mongodb.net:27017,ac-xjhhhyo-shard-00-01.quiz4be.mongodb.net:27017,ac-xjhhhyo-shard-00-02.quiz4be.mongodb.net:27017/test?replicaSet=atlas-kp5b32-shard-0&ssl=true&authSource=admin";

app.get('/api', (req, res) => {
	res.send("Done");
});


//Get all user
app.get('/api/user', (req, res) => {
   console.log("request received for get all users");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");
        dbo.collection("user").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Get One user
app.get('/api/user/:id', (req, res) => {
	var id = req.params.id;
	console.log("request received for get One user");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");
        dbo.collection("user").find({NIC : id}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Create user
app.post('/api/user', (req, res) => {
    console.log("Create user started");
    var memberObj = new Object();

    memberObj.cusID = req.body.cusID;
    memberObj.FullName = req.body.FullName;
    memberObj.DOB = req.body.DOB;
	memberObj.LoanAmount = req.body.LoanAmount;
	memberObj.UsedAmount = req.body.UsedAmount;
    memberObj.InstalmentPlan = req.body.InstalmentPlan;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");
        dbo.collection("user").insertOne(memberObj, function (err1, res1) {
            if (err1) throw err1;
            res.send(true);
            db.close();
        });
    });

});

//Update user
app.put('/api/user', (req, res) => {

    var memberObj = new Object();

    memberObj.cusID = req.body.cusID;
    memberObj.FullName = req.body.FullName;
    memberObj.DOB = req.body.DOB;
	memberObj.LoanAmount = req.body.LoanAmount;
	memberObj.UsedAmount = req.body.UsedAmount;
    memberObj.InstalmentPlan = req.body.InstalmentPlan;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");

        var myquery = { NIC : memberObj.NIC };
        var newvalues = { $set: {Status: memberObj.Status } };

        dbo.collection("user").updateOne(myquery , newvalues , function (err1, res1) {
                if (err1) throw err1;
                res.send(true);
                db.close();
        });
    });
});




app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});