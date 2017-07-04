var express = require('express');
var router = express.Router();
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/meeting'; // 数据库为 meeting

var findAllSites = function(callback){

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        var collection = db.collection('site');
        // var whereStr = {"name":"菜鸟教程"};//要检索的字段
        // var whereStr = '';//whereStr
        collection.find().toArray(function(error, sites){
            // if(error){
            //     console.warn(error);
            //     callback(sites);
            //     return;
            // }
            callback(sites);
        });
        db.close();
    });

};
var insertData = function(req,callback){
    MongoClient.connect(DB_CONN_STR,function(err,db){
        var collection = db.collection('site');
        var data ={"name":req.body.siteName,"url":req.body.siteURL};
        collection.insert(data, function(err, result) { 
            if(err){
                console.warn(err);
                callback(result);//用某一个方法处理收到的result
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



///////

/////////////////////////

var findMeetings = function(whereStr,callback){
 
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        var collection = db.collection('meetings');
        // whereStr = {"meetingDate":today};
        collection.find(whereStr).sort({'meetingStart':1}).toArray(function(error, meetings){
            callback(meetings);
        });
        db.close();
    });

};
var insertMeetData = function(req,callback){
    MongoClient.connect(DB_CONN_STR,function(err,db){
        var collection = db.collection('meetings');
        // var meetingStartTime = req.body.meetingDate +' '+ req.body.meetingStart;
        //     meetingStartTime = new moment(meetingStartTime).format('YYYY-MM-DD HH:MM');
        //     meetingStartTimeStr = meetingStartTime.split(' ');
        //     meetingStartTime = meetingStartTimeStr[1];
        //     console.log(meetingStartTime +"sadasdasdas");
        var data ={
            "meetingDate":req.body.meetingDate,
            "addDate":req.body.addDate,
            "meetingStart":req.body.meetingStart,
            // "meetingStart":meetingStartTime,
            "meetingEnd":req.body.meetingEnd,
            "meetingDuration":req.body.meetingDuration,
            "meetingTopic":req.body.meetingTopic,
            "meetingGroup":req.body.meetingGroup,
            "meetingKey":req.body.meetingKey
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
    var myDate = new Date();
    var today = myDate.toLocaleDateString();
    var meetingStr = {"meetingDate":today};
    console.log(meetingStr)   
    findMeetings(meetingStr,callback);
});
router.post('/meeting', function(req, res, next) {

    var callback = function(meetings){
        res.render('meeting',{meetingList: meetings});
    };
    // insertMeetData(req,callback);
    insertMeetData(req,function(){});
    var myDate = new Date();
    var today = myDate.toLocaleDateString();
    var meetingStr = {"meetingDate":today};
    console.log(meetingStr)
    findMeetings(meetingStr,callback);
});
// router.post('/meeting', function(req, res, next) {
//     var callback = function(meetings){
//         res.render('meeting',{meetingList: meetings});
//     };
//     findMeetings(callback);
// });
// router.post('/', function (req, res, next) {
//     var callback = function(result){
//         res.render('index',{siteList: result});
//     }
//     insertData(req,callback);
// });
router.post('/abc', function (req, res, next) {
    var data ={"userID":req.body.userID,"password":req.body.password};
    res.send('hello world');

});


//////


router.get('/', function(req, res, next) {
    var callback = function(sites){
        res.render('index',{siteList: sites});
    };
    findAllSites(callback);
});
router.post('/', function (req, res, next) {
    var callback = function(result){
        res.render('index',{siteList: result});
    }
    insertData(req,callback);
});
router.post('/abc', function (req, res, next) {
    var data ={"userID":req.body.userID,"password":req.body.password};
    res.send('hello world');

});
router.get('/addmeeting', function(req, res, next) {
    res.render('addmeeting');
});
router.get('/abc', function(req, res, next) {
    res.render('abc');
});
router.get('/form', function(req, res, next) {
    res.render('form');
});

// router.get('/meeting', function(req, res, next) {
//     res.render('meeting');
// });


// router.get('/addMeeting', function(req, res, next) {
//     // var myDate = new Date();
//     // var theDay = myDate.toLocaleDateString();
//     res.render('addMeeting');
// });

/////////////
router.get('/addpost',function(req, res, next) {
    var callback = function(meetings){
        res.send('addpost',{meetingList: meetings});
    };
    var meetingStr =null; 
    findMeetings(meetingStr,callback);
});


router.post('/addpost',function (req, res, next) {
    var callback = function(meetings){
        // res.send('addpost',{meetingList: meetings});
        res.render('addpost',{meetingList: meetings});
    };
    insertMeetData(req,callback);
});
/////////////////////////
module.exports = router;







