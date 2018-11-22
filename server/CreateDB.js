const express = require('express')
const mysql = require('mysql');
let router = express.Router();

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rina3004',
  database: "myproject"

});

connection.connect(function (err) {
  if (!!err) {
    console.log('error: ' + err.message);
  } else {
    console.log("connect");

  }
});
router.post("/", (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Max-Age', 86400)
  res.header('Access-Control-Allow-Headers', '*');

  console.log("create");

  insertTBDb = (req) => {

    let sendProject = req.body.sendProject

    let table = `create table ${sendProject} (Version INT AUTO_INCREMENT PRIMARY KEY, week int DEFAULT 1, ProbabilityTest int, ConcequenceTest int , MitigationTest varchar (255),ReasonTest varchar (255),ProbabilityBudget int , ConcequenceBudget int , MitigationBudget varchar (255) ,ReasonBudget varchar (255),ProbabilityDelay int,ConcequenceDelay int,MitigationDelay varchar (255),ReasonDelay varchar (255),ProbabilityCustomer int,ConcequenceCustomer int,MitigationCustomer varchar (255),ReasonCustomer varchar (255) ,ProbailityOther1 int, ConcequenceOther1 int, MitigationOther1 varchar (255) , ReasonOther1 varchar (255) ,ProbailityOther2 int, ConcequenceOther2 int, MitigationOther2 varchar (255) , ReasonOther2 varchar (255) ,Total int)`
    return table
  }
  const mysqlll = insertTBDb(req);

  connection.query(mysqlll, (err, result, files, rows) => {
    if (err) {
      console.log('error query create' + err.message);
    } else {
      console.log("succes: ", result)

    }
  })
})
    // connection.end(function(err) {
    //   if (err) {
    //     return console.log('error:' + err.message);
    //   }
    //   console.log('Close the database connection.');
    // });
module.exports = router;
