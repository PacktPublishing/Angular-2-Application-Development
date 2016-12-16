const express = require("express");
const compression = require("compression");

process.on("uncaughtException", console.error);

const app = express();
app.use(compression());

console.log(__dirname);

app.use(express.static(__dirname + "/"));

const port = 3011;
app.listen(port);
console.log("Server listening on port " + port + "...");