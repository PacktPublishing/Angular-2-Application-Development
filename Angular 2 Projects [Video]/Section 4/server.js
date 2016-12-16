const compression = require("compression");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Twit = require("twit");

process.on("uncaughtException", console.error);

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use(compression());
app.use("/app", express.static(__dirname + "/app"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/font", express.static(__dirname + "/font"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/lib", express.static(__dirname + "/lib"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const twit = new Twit({
    consumer_key: "LcBR3QydIFtnGUyvGogGeBPy5",
    consumer_secret: "dOL6h56ISoBbFG2vwOQnJy6QwlPWzyYMjFcb81zbAeIBejyuuG",
    access_token: "499080236-IQQ3uu1gncT1QYt0rQJTNs3O32zJGlo4Kqrp2NNk",
    access_token_secret: "MnxXTBXjl3YAVocxAmC4P9er2YWSPLJ1JV9S39XGYUO2n"
});

io.on("connection", function (socket) {
    console.log("Connected to the stream!");

    socket.on("stream", function (params) {
        const twitter = twit.stream("statuses/sample");

        // Listen to the `connect` event.
        twitter.on("connect", function (params) {
            console.log("Streaming from the Twitter API...");
        });

        // Emit an event with the Tweet information.
        twitter.on("tweet", function (tweet) {
            io.sockets.emit("tweet", tweet);
        });

        // Listen to the `disconnect`/`stop` events to destroy the connection.
        socket.on("disconnect", function (params) {
            console.log("Streaming ended (disconnected).");
            twitter.stop();
        });

        socket.on("stop", function (params) {
            console.log("Streaming ended (stopped).");
            twitter.stop();
        });
    });
});

const port = 3011;
server.listen(port);
console.log("Server listening on port " + port + "...");