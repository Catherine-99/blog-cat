//import express, mysql
const express = require("express");
const mysql = require("mysql");

// start server
const app = express();
app.listen(8000, () => {
    console.log("Port 8000: server is running")
});

//connect to database 

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '810751',
    database: 'database'
})

