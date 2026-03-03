const express = require('express')
const authRoute = require("./Routes/auth.controller")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("TaskManager API is working!");
});

module.exports =  app;