/**
 * Created by pawan on 24-01-2017.
 */
var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: 'pawanyadav',
    password: 'pawan',
    database: "dbase"
});

router.get("/",function (req,res,next) {
    var phone = parseInt(req.query.phone);
    //console.log(phone);
    var data = {
        userid: phone
    }
    con.query('INSERT INTO orders SET ?',data,function (err,result) {
        if(err)
            console.log(err.message);
        else
        {
            console.log(result.insertId);
            res.render('order',{id: result.insertId});
        }
    });

});


 router.post('/',function (req,res) {
    //console.log("dsfsdf");

    var data = {
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        totalcost: parseInt(req.body.totalcost),
        userid: parseInt(req.body.userid),

    }

    //console.log(req.body.itemdetails);
    //console.log("dfgdfg");

    con.query('INSERT INTO orders SET ?',data,function (err,re) {
        if(err)
            console.log(err.message);
        else
            res.render('index');
    });

});

module.exports = router;