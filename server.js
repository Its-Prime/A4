
/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students. *
* Name: MYKYTA TODRASHKO Student ID: 116607193 Date: 2/18/22
*  Online (Heroku) Link: ________https://secure-wave-82684.herokuapp.com/________________________________________________
*
********************************************************************************/

var express = require("express");
var path = require("path");
var data = require("./modules/officeData.js");

var app = express();
var HTTP_PORT = process.env.PORT || 8080; 

// setup a 'route' to listen on the default url 
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

data.initialize().then(function(){
  app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
}).catch((err)=>{
	console.log(err);
});

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname,"/views/home.html"));
});

app.get("/list", (req,res) => {
   res.sendFile(path.join(__dirname,"/views/list.html"));
});

app.get("/table", (req,res) => {
   res.sendFile(path.join(__dirname,"/views/table.html"));
});

app.get("/table", (req,res) => {
   res.sendFile(path.join(__dirname,"/views/table.html"));
});

app.get("/audio", (req,res) => {
   res.sendFile(path.join(__dirname,"/views/audio.html"));
});

app.get("/video", (req,res) => {
   res.sendFile(path.join(__dirname,"/views/video.html"));
});
app.get("/storefront", (req,res) => {
   res.sendFile(path.join(__dirname,"/views/storefront.html"));
});

app.get("/employee/:employeeNum", (req, res) => {
   data.getEmployeeByNum(req.params.employeeNum).then((data) => {
        res.json(data);
   }).catch((err) => {
       res.json({message: "no results"});
   });
});

app.get("/PartTimer", (req, res) => {
   data.getPartTimers().then((data) => {
        res.json(data);
   });
});

app.use((req,res) => {
   res.status(404).send("Page Not Found")
});