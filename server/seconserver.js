let express = require('express')
let mysql = require('mysql');
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

router.post('/', (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Max-Age', 86400)
  res.header('Access-Control-Allow-Headers', '*');

  console.log("reqqqqqqqqqq", req.body)



  let arr = []
  req.body.data.forEach(element => {
    arr.push({ ["probability" + element.riskName]: element.probability })
    arr.push({ ["concequence" + element.riskName]: element.concequence })
    arr.push({ ["mitigation" + element.riskName]: element.mitigation })
    arr.push({ ["reason" + element.riskName]: element.reason })

  });

  console.log("arrrrrrrr",arr);
  

  const getKeysAndVals = (arr) => {
    arrKeys = []
    arrVals = []

    arr.forEach(elem => {
      let myKey = Object.keys(elem)[0]
      // console.log("mykey", myKey);

      if (elem[myKey].length > 0 || elem[myKey] > 0) {
        arrKeys.push(myKey)

        arrVals.push(`'${(Object.values(elem)[0])}'`)
      }
    })

    return [arrKeys, arrVals]

  }
  
  
  let sqlKeys = getKeysAndVals(arr)[0]
  
  let sqlValues = getKeysAndVals(arr)[1]

  console.log("keeeeeeeeyy",sqlKeys);
  // console.log("keeeeeeeeyy",sqlKeys);
  
  
  const avreg = () => {
    let risksLen = req.body.data.length
    
    let myOriginArray = req.body.data
    
    let sum = 0
    
    for (let i of myOriginArray) {
      
      let probability = parseInt(i.probability)
      
      let concequence = parseInt(i.concequence)
      
      sum += (probability * concequence) / risksLen
      
    }
    return Math.ceil(sum);
  }



  
  let total = avreg()
  

  sqlKeys.push("total")
  
  sqlValues.push(`'${total}'`)
  
  sqlKeys.push("week")
  
  
  
  sqlValues.push(`'${req.body.week}'`)
  
  
  sqlKeys = sqlKeys.join(",")
  
  sqlValues = sqlValues.join(",")
  
  // console.log("key",sqlKeys);
  console.log("value",sqlValues);

  const projectName = req.body.projectName

  const insertInDb = (project, sqlKeys, sqlValues) => {

    const sql = `INSERT INTO ${project} (${sqlKeys}) VALUES(${sqlValues} )`
    return sql
  }
  const mysql = insertInDb(projectName, sqlKeys, sqlValues)
  console.log("mysql", mysql);


  connection.query(mysql, (err, result, files, rows) => {
    if (err) {
      console.log('error query  ' + err.message);
    } else {
      console.log("succes ", result)

    }
  })
})
module.exports = router;