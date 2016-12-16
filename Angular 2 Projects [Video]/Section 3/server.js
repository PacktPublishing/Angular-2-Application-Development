const express = require("express");
const compression = require("compression");
const https = require("https");

process.on("uncaughtException", console.error);

const app = express();
app.use(compression());

app.get("/api/weather/:woeId", function (req, res) {
    const woeId = req.params.woeId;
    const requestPath = "/v1/public/yql?q=select%20item.condition.code%2C%20item.condition.temp%20from%20weather.forecast%20" +
        `where%20woeid%3D${woeId}%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
    return https.get({
        host: "query.yahooapis.com",
        path: requestPath
    }, function(response) {
        var body = "";
        response.on("data", function (d) {
            body += d;
        });
        response.on("end", function () {
            const parsed = JSON.parse(body);
            res.status(200).send(parsed);
        });
    });
});

app.use("/app", express.static(__dirname + "/app"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/font", express.static(__dirname + "/font"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/lib", express.static(__dirname + "/lib"));

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const port = 3011;
app.listen(port);
console.log("Server listening on port " + port + "...");