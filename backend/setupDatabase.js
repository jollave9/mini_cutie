const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ''
});

const createDatabase = `CREATE DATABASE cutie_mini;`
const useDatabase = `USE cutie_mini;`
const createTable = `CREATE TABLE result(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    faceExpression varchar(255),
    transcript text,
    video varchar(255),
    sentiment text
);
`
con.connect(err=> {
    if (err) throw err;
    console.log("Connected to mysql!");
    con.query(createDatabase, (err, result)=>{
        if (err) throw err;
        console.log("database created");
    });
    con.query(useDatabase, (err, result)=>{
        if (err) throw err;
        console.log("using cutie_mini");
    });
    con.query(createTable, (err, result)=>{
        if (err) throw err;
        console.log("table created");
    });

    con.end((err)=>{
        console.log(err)
    })
});