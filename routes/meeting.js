var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/meeting'; // 数据库为 meeting

var findAllMeetings = function(callback){
    var myDate = new Date();
    var today = myDate.toLocaleDateString();
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        var collection = db.collection('allMeeting');
        var whereStr = {"date":today};
        collection.find().toArray(function(error, meetings){
            callback(meetings);
        });
        db.close();
    });

};
var insertMeetData = function(req,callback){
    MongoClient.connect(DB_CONN_STR,function(err,db){
        var collection = db.collection('meetings');
        var data ={
            "meetingDate":req.body.meetingDate,
            "addDate":req.body.addDate,
            "meetingStart":req.body.meetingStart,
            "meetingEnd":req.body.meetingEnd,
            "meetingDuration":req.body.meetingDuration,
            "meetingTopic":req.body.meetingTopic,
            "meetingGroup":req.body.meetingGroup
        };
        



        collection.insert(data, function(err, result) { 
            if(err){
                console.warn(err);
                callback(result);
                return;
            }
            // callback(result);
        });
        collection.find().toArray(function(error, result){
            if(err){
                console.warn(err);
                callback(result);
                return;
            }
            callback(result);
        });
        db.close();
    })
}
router.get('/meeting', function(req, res, next) {
    var callback = function(meetings){
        res.render('meeting',{meetingList: meetings});
    };
    findAllMeetings(callback);
});
router.post('/meeting', function(req, res, next) {
    var callback = function(meetings){
        res.render('meeting',{meetingList: meetings});
    };
    findAllMeetings(callback);
});
// router.post('/', function (req, res, next) {
//     var callback = function(result){
//         res.render('index',{siteList: result});
//     }
//     insertData(req,callback);
// });
// router.post('/abc', function (req, res, next) {
//     var data ={"userID":req.body.userID,"password":req.body.password};
//     res.send('hello world');

// });

router.post('/addpost', function (req, res, next) {
    var callback = function(meetings){
        res.render('/',{meetingList: meetings});
    };
    insertMeetData(req,callback);
});

module.exports = router;
