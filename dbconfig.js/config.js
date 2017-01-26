var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: 'pawanyadav',
    password: 'pawan',
    database: "DBase"
});

con.connect(function (err) {
    if(err){
        console.log('error connection in db customised');
    }
    console.log('connection established by customised');
});

module.exports = con;