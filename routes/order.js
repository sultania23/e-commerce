/**
 * Created by pawan on 24-01-2017.
 */
var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var Q = require('q');
var con = mysql.createConnection({
    host: "localhost",
    user: 'pawanyadav',
    password: 'pawan',
    database: "dbase"
});

router.get("/",function (req,res,next) {
    // order.ejs
    var phone = parseInt(req.query.phone);
    //console.log(phone);
    var startdate = "01/01/01";
    var data = {
        userid: phone,
        startdate: "01/01/01"
    }
    con.query('INSERT INTO orders SET ?',data,function (err,result) {
        if(err)
            console.log(err.message);
        else
        {
            console.log(result.insertId);
            res.render('order',{orderid: result.insertId,userid: phone,startdate: startdate});
        }
    });

});
router.get('/orders',function (req,res,next) {
    var id = req.query.phone;
    con.query('SELECT * FROM orders WHERE userid = ?',id,function (err,rows) {
        if(err)
            console.log(err.message);
        else
        {
            res.render('allorder',{rows: rows});
        }
    });
});

 router.post('/',function (req,res) {
    //console.log("dsfsdf");

    var data = {
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        totalcost: parseInt(req.body.totalcost),
        userid: parseInt(req.body.userid)
    };

    //console.log(req.body.itemdetails);
    //console.log("dfgdfg");

    con.query('INSERT INTO orders SET ?',data,function (err,re) {
        if(err)
            console.log(err.message);
        else
            res.render('index');
    });

});


router.post('/singleorder',function (req,res) {
    var data = {
        orderid: req.body.orderid,
        itemname: req.body.itemname,
        detail: req.body.detail,
        cost: req.body.cost,
        quantity: req.body.quantity
    };
    con.query('INSERT INTO orderdetail SET ?', data,function (err,re) {
        if(err)
        {
            console.log(err.message);
        }
        else{
            console.log(data);
            res.render('singleorder',{data: data});
        }
    });
});
router.post('/submit',function (req,res) {
    console.log("yups...");
    var sql = "INSERT INTO orderdetail SET ?";
    var len = Object.keys(req.body).length;
    for(i=1;i<=len;i++)
    {
        var data = {
            orderid: req.body[i].orderid,
            itemname: req.body[i].itemname,
            detail: req.body[i].detail,
            cost: req.body[i].cost,
            quantity: req.body[i].quantity
        };
        con.query(sql,data,function (err,reslt) {
           if(err)
               console.log(err.message);
           else
           {
               console.log("succeed");
           }
        });
    }
    console.log("outside fn.");
    res.send();

});
router.post('/bill',function (req,res)
{
    console.log("bill details render.");
    console.log(req.body.orderid);

    var RESULT={},i=0;
    con.query('SELECT * FROM orders WHERE orderid = ?',req.body.orderid,function (err,result) {
       if(err)
           console.log(err.message);
       else
       {
           RESULT [i] = result;
           i++;
           console.log(RESULT[0][0].userid);
       }
    });
   console.log("iuyytrwerthj");

    con.query('SELECT * FROM orderdetail WHERE orderid = ?',req.body.orderid,function (error,rows) {
        if(error)
            console.log(error);
        else
        {
            //console.log(req.body);
            var data = rows;
            console.log(data);
            res.render('billpage',{data: data});
            //
        }
    });
});
module.exports = router;