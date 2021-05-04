const express = require("express");
const bodyParser = require("body-parser");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./client.json");
const env = require("dotenv").config({path: __dirname + '/.env'});

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// Function to read google spreadsheet
async function accessEvent(){
  const doc = new GoogleSpreadsheet("1gFWIzdgT4-yc-4eeWUA0XKydmiaGRcQUC6hE9FiVM-A");
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  rows.reverse();
  return rows;
};
// home
app.get("/", async function (req, res) {
  rows = await accessEvent();
  events = rows.slice(0,3);
  res.render("pages/home", {events: events});
});


// EVENTS
app.get('/events',function(req,res){
  res.render('pages/events')
})

// Sports

// inter-iit sports
app.get("/interiit", function (req, res) {
  res.render("pages/sports/interiit");
});

app.get("/athletics", function (req, res) {
  res.render("pages/sports/interiit-sports/athletics");
});

app.get("/aquatics", function (req, res) {
  res.render("pages/sports/interiit-sports/aquatics");
});

app.get("/badminton", function (req, res) {
  res.render("pages/sports/interiit-sports/badminton");
});

app.get("/basketball", function (req, res) {
  res.render("pages/sports/interiit-sports/basketball");
});

app.get("/chess", function (req, res) {
  res.render("pages/sports/interiit-sports/chess");
});

app.get("/cricket", function (req, res) {
  res.render("pages/sports/interiit-sports/cricket");
});

app.get("/football", function (req, res) {
  res.render("pages/sports/interiit-sports/football");
});

app.get("/hockey", function (req, res) {
  res.render("pages/sports/interiit-sports/hockey");
});

app.get("/squash", function (req, res) {
  res.render("pages/sports/interiit-sports/squash");
});

app.get("/tennis", function (req, res) {
  res.render("pages/sports/interiit-sports/tennis");
});

app.get("/tabletennis", function (req, res) {
  res.render("pages/sports/interiit-sports/tabletennis");
});

app.get("/volleyball", function (req, res) {
  res.render("pages/sports/interiit-sports/volleyball");
});

app.get("/waterpolo", function (req, res) {
  res.render("pages/sports/interiit-sports/waterpolo");
});

app.get("/weightlifting", function (req, res) {
  res.render("pages/sports/interiit-sports/weightlifting");
});


// non-interiit Sports
app.get('/non-interiit', function(req,res){
  res.render('pages/sports/non-interiit')
});

app.get('/bridge', function(req,res){
  res.render('pages/sports/non-interiit/bridge')
});

app.get('/cycling', function(req,res){
  res.render('pages/sports/non-interiit/cycling')
});

app.get('/fitness', function(req,res){
  res.render('pages/sports/non-interiit/fitness')
});

app.get('/forestgumps', function(req,res){
  res.render('pages/sports/non-interiit/forest')
});

app.get('/frisbee', function(req,res){
  res.render('pages/sports/non-interiit/frisbee')
});

app.get('/triathlon', function(req,res){
  res.render('pages/sports/non-interiit/triathlon')
});
// Facilities/Grounds
app.get('/facilities', function(req,res){
  res.render('pages/sports/facilities')
})


// HISTORY IITM
app.get('/history-iitm', function(req,res){
  res.render('pages/history/iitm')
});


// // RECORDS
//
// // Inter-IIT
// app.get('/records-interiit', function(req,res){
//   res.render('pages/records/interiit')
// });
//
// // Schroeter
// app.get('/records-schroeter', function(req,res){
//   res.render('pages/records/schroeter')
// });
//
// // Dean's Trophy
// app.get('/records-deanstrophy', function(req,res){
//   res.render('pages/records/deanstrophy')
// });


// PEOPLE

// Hall of fame
app.get('/halloffame', function(req,res){
  res.render('pages/people/wallOfFame')
})

// SOC
app.get("/SOC", function (req, res) {
  res.render("pages/people/SOC");
});

// Gymkhana
app.get("/gymkhana", function (req, res) {
  res.render("pages/people/Gymkhana");
});

// Results
app.get("/results", function (req, res) {
  res.render("pages/results");
});
// FEEDBACK
app.get('/feedback', function(req,res){
  formspreeURL = "https://formspree.io/" + env.parsed.FORMSPREE_ID;
  res.render('pages/Feedback', {formspreeURL : formspreeURL});
})

app.listen(PORT, function () {
  console.log("Server is running on localhost", PORT);
});
