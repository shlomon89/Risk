const express = require('express')
const mysql = require('mysql');
let router = express.Router();

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'aaaa',
  database: "myproject"

});

connection.connect(function (err) {
  if (!!err) {
    console.log('error: ' + err.message);
  } else {
    console.log("connect");

  }
});

router.get("/getCurrentWeek/:projectName", (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Max-Age', 86400)
  res.header('Access-Control-Allow-Headers', '*');

  console.log("1er");

  insertTBDb = () => {

    const project  = req.params.projectName


    let sql = ` SELECT * FROM ${project} order by week desc, version desc limit 1 `
    

    return sql

  }
  const mysqlll = insertTBDb();

  connection.query(mysqlll, (err, result, files, rows) => {
    if (err) {
      console.log('error query ' + err.message);
    } else {
      console.log("succes ", result)

        // previousWeek =Object.values(result[0])[0]
        
        // let newVersion = previousWeek+1
        // console.log("newVersion",newVersion);
        
        // console.log("pp",Object.values(previousWeek)[0])
        
        res.send(result);
    }
  })
})
module.exports = router;