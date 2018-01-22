const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
const getData = require('./getData.js');
var app = express();
app.use(bodyParser.json())

var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

function getId(url) {
  let splitByD = url.split("/d/");
  let split = splitByD[1].split("/");
  let ret = split[0];
  return ret;
}

app.post('/sheets', async function (req, res) {
  let sheets = req.body.sheets;
  if (!sheets) {
    return res.status(400).send({ error:true, message: 'Please provide sheets' });
  }
  sheets.forEach(sheet => {
    let url = sheet.url
    let sheetName = sheet.sheet
    let from = sheet.from
    let to = sheet.to
    let id = getId(url);
    getData(id, sheetName, from, to);
  })
  return res.status(200).send({status:"ok"})
})

app.listen(8080)
