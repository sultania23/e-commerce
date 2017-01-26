var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: 'pawanyadav',
    password: 'pawan',
    database: "dbase"
});
/* GET users listing. */
router.get('/', function(req, res) {
    var ident = req.query.phone;
    //console.log(req.query.phone);
    //res.send(req.query.phone);
    con.query('SELECT * FROM users WHERE phone = ? ', ident,function (err, rows) {
        if (err) {
            console.log(err.message);
        }
        else {
            var str = {
                name: rows[0].name,
                phone: rows[0].phone,
                address: rows[0].address,
                age: rows[0].age
            };
            res.render('user',str);
        }
    });

});

router.post('/',function (req,res) {
    var data = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        age: parseInt(req.body.age)
    };

    con.query('INSERT INTO users SET ?',data,function (err,re) {
        if(err)
            console.log(err.message);
        else
        {
            console.log(re);
            res.render('user',data);
        }
    });
});

router.post('/update',function (req,res) {
    console.log(req.body.name);
    console.log(req.body.age);
    console.log(req.body.phone);
    console.log(req.body.waist);
    console.log(req.body.chest);
    console.log(req.body.height);

    var data = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        height: req.body.height,
        waist: req.body.waist,
        chest: req.body.chest
    }
   con.query('UPDATE users SET ? WHERE ?',[data,{phone: req.body.phone}],function (err,resp) {
      if(err){
          console.log(err);
      }
      else {
          console.log("updated");
          res.render('index');
      }
   });
});
module.exports = router;
