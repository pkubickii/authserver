const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
console.log(CLIENT_ID);
console.log(CLIENT_SECRET);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async function (req, res) {
  console.log(req.query.code);
  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
  await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.get("/getUserData", async function (req, res) {
  req.get("Authorization"); //Bearer access_token
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), //Bearer access_token
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});
app.listen(8080, function () {
  console.log("Server running on port 8080 :)");
});
