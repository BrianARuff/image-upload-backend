const express = require("express");
const port = process.env.PORT || 9000;
const app = express();
const knex = require("./knex");
const cors = require("cors");
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  knex
    .raw("select * from images")
    .then(images => res.status(200).json(images))
    .catch(err => res.status(500).json(err));
});

app.post("/", (req, res) => {
  console.log(req.body["image"]);
  knex("images")
    .insert({ image: req.body["image"] })
    .then(fn => res.status(200).json(fn))
    .catch(err => res.status(500).json(err));
});

app.get("/test", (req, res) => {
  res.status(200).json({ message: "WORKING" });
});

app.listen(port, () => console.log("Server running on port " + port + "."));
