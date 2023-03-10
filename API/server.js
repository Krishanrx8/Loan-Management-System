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
app.get('/user', (req, res) => {
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
app.get('/user/:id', (req, res) => {
    var id = req.params.id;
    console.log("request received for get One user - " + id);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");
        var o_id = new mongo.ObjectID(id);
        dbo.collection("user").find({ _id: o_id }).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Create user
app.post('/user', (req, res) => {
    console.log("Create user started");
    var memberObj = new Object();

    memberObj.FullName = req.body.name;
    memberObj.Address = req.body.address;
    memberObj.DOB = req.body.DOB;
    memberObj.Email = req.body.email;
    memberObj.Password = req.body.password;
    memberObj.LoanBalance = 15000;
    memberObj.UsedAmount = 15000;
    memberObj.InstalmentPlan = 3;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");
        dbo.collection("user").insertOne(memberObj, function (err1, res1) {
            if (err1) throw err1;
            res.send("Success");
            db.close();
        });
    });

});

//Update user
app.put('/user/:id', (req, res) => {
    var id = req.params.id;
    var memberObj = new Object();

    memberObj.FullName = req.body.name;
    memberObj.Address = req.body.address;
    memberObj.DOB = req.body.DOB;
    memberObj.Email = req.body.email;
    memberObj.LoanBalance = req.body.loanU;;
    memberObj.UsedAmount = req.body.UsedAmountU;

    console.log(memberObj);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");

        var myquery = { _id: mongo.ObjectID(id) };
        var newvalues = {
            $set: {
                FullName: memberObj.FullName,
                Address: memberObj.Address,
                DOB: memberObj.DOB,
                Email: memberObj.Email,
                LoanBalance: memberObj.LoanBalance,
                UsedAmount: memberObj.UsedAmount
            }
        };
        dbo.collection("user").updateOne(myquery, newvalues, function (err1, res1) {
            if (err1) throw err1;
            res.send(true);
            db.close();
        });
    });
});

//Update user by user
app.put('/userByUser/:id', (req, res) => {
    var id = req.params.id;
    var memberObj = new Object();

    memberObj.FullName = req.body.name;
    memberObj.Address = req.body.address;
    memberObj.DOB = req.body.DOB;
    memberObj.Email = req.body.email;
    memberObj.Password = req.body.password;

    console.log(memberObj);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");

        var myquery = { _id: mongo.ObjectID(id) };
        var newvalues = {
            $set: {
                FullName: memberObj.FullName,
                Address: memberObj.Address,
                DOB: memberObj.DOB,
                Email: memberObj.Email,
                Password: memberObj.Password
            }
        };
        dbo.collection("user").updateOne(myquery, newvalues, function (err1, res1) {
            if (err1) throw err1;
            res.send(true);
            db.close();
        });
    });
});


//delete User
app.delete('/user/:id', function (req, res) {
    var id = req.params.id;
    console.log("deleting" + id);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");
        var myquery = { _id: mongo.ObjectID(id) };
        dbo.collection("user").deleteOne(myquery, function (err1, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Get all Payment Request
app.get('/payment', (req, res) => {
    console.log("request received for get all Payment Request");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");
        dbo.collection("payment").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Get One Payment Request
app.get('/payment/:id', (req, res) => {
    var id = req.params.id;
    console.log("request received for get One Payment Request - " + id);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");
        var o_id = new mongo.ObjectID(id);
        dbo.collection("payment").find({ _id: o_id }).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

//Create Payment Request
app.post('/payment', (req, res) => {
    console.log("Create Payment Request started");
    var memberObj = new Object();

    memberObj.userID = req.body.userID;
    memberObj.Date = req.body.Date;
    memberObj.BankName = req.body.BankName;
    memberObj.BranchName = req.body.BranchName;
    memberObj.BranchCode = req.body.BranchCode;
    memberObj.Amount = req.body.Amount;
    memberObj.Status = "Pending";
    memberObj.Reason = "";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");
        dbo.collection("payment").insertOne(memberObj, function (err1, res1) {
            if (err1) throw err1;
            res.send("Success");
            db.close();
        });
    });

});

//Accept the payment
app.put('/acceptPayment/:id', (req, res) => {
    var id = req.params.id;
    var memberObj = new Object();

    memberObj.NewAmount = req.body.NewAmount;
    memberObj.userID = req.body.userID;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");

        var myquery = { _id: mongo.ObjectID(memberObj.userID) };
        var newvalues = { $set: { LoanBalance: memberObj.NewAmount } };
        dbo.collection("user").updateOne(myquery, newvalues, function (err1, res1) {
            if (err1) throw err1;

            db.close();
        });
    });

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");

        var myquery = { _id: mongo.ObjectID(id) };
        var newvalues = { $set: { Status: "Accepted" } };
        dbo.collection("payment").updateOne(myquery, newvalues, function (err1, res1) {
            if (err1) throw err1;
            res.send(true);
            db.close();
        });
    });
});

//Reject the payment
app.put('/rejectPayment/:id', (req, res) => {
    var id = req.params.id;
    var memberObj = new Object();

    memberObj.Reason = req.body.Reason;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LoanSystem");

        var myquery = { _id: mongo.ObjectID(id) };
        var newvalues = { $set: { Status: "Rejected", Reason: memberObj.Reason } };
        dbo.collection("payment").updateOne(myquery, newvalues, function (err1, res1) {
            if (err1) throw err1;
            res.send(true);
            db.close();
        });
    });

});



app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});