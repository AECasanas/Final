const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
}

console.log("process.env.NODE_ENV = ", process.env.NODE_ENV);

const toolModel = require("./api/tool.model");
const toolControllers = require("./api/tool.controllers");

const app = express();

const dataBaseURL = process.env.DATABASE || "mongodb://localhost:27017";
// const dataBaseURL = "mongodb://localhost:27017"; // use the local docker database
// const dataBaseURL = "mongodb+srv://daniel:dd2345@cluster0.bs2la.mongodb.net/recipes?retryWrites=true&w=majority"; // use the hosted database

console.log("dataBaseURL::", dataBaseURL);

mongoose
  .connect(dataBaseURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.json({ extended: false })); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/tool", toolControllers.findAll);
app.get("/api/tool/:id", toolControllers.findById);
app.post("/api/tool", toolControllers.add);
app.put("/api/tool/:id", toolControllers.update);
app.delete("/api/tool/:id", toolControllers.delete);
app.get("/api/import", toolControllers.import);
app.get("/api/killall", toolControllers.killall);
app.post("/api/upload", toolControllers.upload);

const PORT = process.env.PORT || 3456;

app.listen(PORT, () =>
  console.log(`Server running at port ${PORT}. Process Env db: ${process.env.DATABASE});
`)
);



var hammer = $('.hammer'),
hammerTl = new TimelineMax({repeat:-1,paused:true});
hammerTl.to(hammer,0.15,{
rotation:-30,transformOrigin:"right bottom",
bezier:{
type:"soft",
values:[{x:0,y:0},{x:0,y:-2},{x:0,y:-3},{x:0,y:-6},{x:0,y:-10}],
autorotate:true},ease: Expo.easeIn
})
.to(hammer,0.15,{
rotation:-40,transformOrigin:"right bottom",
bezier:{
type:"soft",
values:[{x:0,y:-15},{x:0,y:-15}],
autorotate:true
},ease: Power4.easeOut
})
.to(hammer,0.6,{rotation:0,transformOrigin:"right bottom",
         bezier:{
type:"soft",
values:[{x:0,y:-3},{x:0,y:-2},{x:0,y:-1},{x:0,y:0}],
autorotate:true}})
// Trigger animation on hover     
$('.link-btn').hover(function() {
    hammerTl.play();
    hammerTl.eventCallback("onRepeat", null);
}, function() {
    hammerTl.eventCallback("onRepeat", function() {
        hammerTl.pause();
    });
});
var controller = new ScrollMagic.Controller();
var buttonScene = new ScrollMagic.Scene({
triggerElement:'.button',
triggerHook:'onEnter',
reverse:false
})
.setTween(buttonTl)
.addTo(controller);

var button = $('.button'),
buttonTl = new TimelineMax();
buttonTl.fromTo(button,2,{y:50,opacity:0},{y:0,opacity:1,ease: Elastic.easeOut.config(1, 0.75)})  



