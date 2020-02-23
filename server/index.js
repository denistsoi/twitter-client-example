require("dotenv").config()

const express = require("express");
const tweetsRouter = require("./routes/tweets")

const app = express();

app.use(express.json())

app.post("/tweets", tweetsRouter)

module.exports = app;