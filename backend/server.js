var Sentiment = require('sentiment');
var cors = require('cors');
var sentiment = new Sentiment();
const mysql = require('mysql');
const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static(__dirname + '/public'));
const multer = require('multer');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ''
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
        let querycount = `SELECT COUNT(id) AS count FROM result`
        con.query(querycount, (err, result)=>{
            if (err) throw err;
            console.log(result);
            cb(null, 'video' + result[0].count + '.mp4')
        })    
    }
  })
  
const upload = multer({ storage: storage })

con.connect(err=> {
    if (err) throw err;
    console.log("Connected to mysql!");
    con.query("USE cutie_mini;", (err, result)=>{
        if (err) throw err;
        console.log("using cutie_mini");
    });
});

app.get('/',(req,res)=>{
    let query = `SELECT * FROM result`
    con.query(query, (err, result)=>{
        if (err) throw err;
        // console.log(result);
        res.json(result)
    }) 
})

app.post('/',upload.single('videoRecording'),(req,res)=>{

    let sentimentinfo = JSON.stringify(sentiment.analyze(req.body.transcript))
    let query = `INSERT INTO result (faceExpression, transcript, video, sentiment) VALUES ('${req.body.faceExpressions}','${req.body.transcript}','https://e1ca3fc570a1.ngrok.io/${req.file.filename}','${sentimentinfo}')`

    con.query(query, (err, result)=>{
        if (err) throw err;
        console.log(result);
    }) 
    res.sendStatus(200)
})

app.listen(5000,()=>console.log('listening on port 5000'))