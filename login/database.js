import mysql from 'mysql2';

import  dotenv from 'dotenv';

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
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})