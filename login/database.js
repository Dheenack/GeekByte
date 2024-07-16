import mysql from 'mysql2';
import 'body-parser';
import  dotenv from 'dotenv';
const encoder=bodyParser.urlencoded();
dotenv.config()
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

console.log("connected to database successfully");
import express from "express";
const app= express();

app.listen(8080,()=>{
    console.log("server is running on port 8080");
})
import path, { parse } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { encode } from 'punycode';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",encoder,function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    pool.query("SELECT * FROM login_info where username=? and user_password=?",[username,password],function(error,results,fields){
        if(results.length>0){
            res.redirect("/welcome");
        }else{
            res.redirect("/");
        }
        res.end()
    })
})
app.get("/welcome",function(req,res){
    res.sendFile(__dirname+"/welcome.html")
})
