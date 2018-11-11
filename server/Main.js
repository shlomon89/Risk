const express = require('express')
// const mysql = require('mysql');
const bodyParser = require('body-parser')
const app = express();
const AllDB = require('./AllDB')

const second = require('./seconserver')
const first = require('./firstserver')
const myname = require('./projectName')

app.use(bodyParser.json())


app.use('/',AllDB)
app.use('/',second)
app.use('/',first)
app.use('/',myname)




const port = 4000;

app.listen(port, () => console.log(`server ${port}`))