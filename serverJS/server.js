const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'password',
    database: 'labrab2'
})


const app = express()

const fs = require("fs");

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post("/api/insert", (req, res) => {
    //console.log(req.body.datas.id);
   // addItems();
   const question = req.body.datas.question;
   const yesId =  req.body.datas.yes;
   const noId =  req.body.datas.no;
   const sqlInsert = "INSERT INTO question (question, yes, no) VALUES (?, ?, ?)"
   db.query(sqlInsert,[question, yesId, noId], (err, results)=> {
    console.log(results);
   });
    
})
app.get("/api/get", (reg, res) => {
    // const data = JSON.parse(fs.readFileSync("data.json"));
    const sqlSelect = "SELECT * FROM question";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
    })
    

})

app.post("/api/change", (req, res) => {
    //console.log(req.body.datas.id);
   // addItems();
   const id = req.body.datas.id;
   const noId =  req.body.datas.noId;
   console.log(id);
   console.log(noId);
   const sqlInsert = "UPDATE question SET `no` = ? WHERE (`id` = ?);"
   db.query(sqlInsert,[noId, id], (err, results)=> {
    console.log(results);
   });
    
})
///////////////////////////////////
const addItems = () => {
    const data = JSON.parse(fs.readFileSync("data.json"));
    data.push({id: 23});
    fs.writeFileSync("data.json", JSON.stringify(data));
    
}


app.get('/', (re, res)=> {
//     const sqlInsert = "INSERT INTO question (question, yes, no) VALUES ('question1', 1, 1)"
//    db.query(sqlInsert, (err, results)=> {
//     if (err){
//         console.log(err);
//     } else{
//         res.send("GIID");
//     }
//    });
// const id = 7
// const noId =  9;
// const sqlInsert = "UPDATE question SET `no` = ? WHERE (`id` = ?);"
// db.query(sqlInsert,[noId, id], (err, results)=> {
//  console.log(results);
// });
})
app.get('/test',(req, res)=> {
    const sql = "SELECT * FROM test";
    db.query(sql, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);    
    })
})
app.get('/json',(req, res)=> {
    const data = JSON.parse(fs.readFileSync("data.json"));
    return res.json(data);
})

app.listen(3001, () =>{
    console.log("listening");
})