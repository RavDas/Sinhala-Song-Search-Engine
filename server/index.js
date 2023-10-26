const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// searching on query

app.post("/srcsearchmetaphor", async (req, res) => {
  const { SourceMetaphorSearch } = require("./DBConnection");
  const data = await SourceMetaphorSearch(req.body.query);
  res.json(data);
});

app.post("/srcsearchmetaphorwithtype", async (req, res) => {
  const { SrcmetaphorSearchWithType } = require("./DBConnection");
  const data = await SrcmetaphorSearchWithType(req.body.query, req.body.type);
  res.json(data);
});

app.post("/tgtsearchmetaphor", async (req, res) => {
  const { TargetMetaphorSearch } = require("./DBConnection");
  const data = await TargetMetaphorSearch(req.body.query);
  res.json(data);
});

app.post("/tgtsearchmetaphorwithtype", async (req, res) => {
  const { TgtmetaphorSearchWithType } = require("./DBConnection");
  const data = await TgtmetaphorSearchWithType(req.body.query, req.body.type);
  res.json(data);
});

app.post("/srcautocomplete", async (req, res) => {
  const { PartialSourceAutoComplete } = require("./DBConnection");
  const data = await PartialSourceAutoComplete(req.body.query);
  res.json(data);
});

app.post("/tgtautocomplete", async (req, res) => {
  const { PartialTargetAutoComplete } = require("./DBConnection");
  const data = await PartialTargetAutoComplete(req.body.query);
  res.json(data);
});

app.post("/otherfieldsearch", async (req, res) => {
    const { OtherFieldSearch } = require("./DBConnection");
    const data = await OtherFieldSearch(req.body.query,req.body.field);
    res.json(data);
  });
  
app.listen(3001, () => console.log("running on 3001"));
