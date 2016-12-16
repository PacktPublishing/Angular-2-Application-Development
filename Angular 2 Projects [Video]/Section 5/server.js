require("angular2-universal-polyfills");

const compression = require("compression");
const express = require("express");
const enableProdMode = require("@angular/core").enableProdMode;
const createEngine = require("angular2-express-engine").createEngine;
const AppModule = require("./app/main").AppModule;

process.on("uncaughtException", console.error);

enableProdMode();

const app = express();
app.use(compression());

app.engine('.html', createEngine({}));
app.set('views', __dirname);
app.set('view engine', 'html');

function ngApp(req, res) {
    res.render("index", {
        req: req,
        res: res,
        ngModule: AppModule,
        preboot: false,
        baseUrl: "/",
        requestUrl: req.originalUrl,
        originUrl: req.hostname
    });
}

app.use("/app", express.static(__dirname + "/app"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/font", express.static(__dirname + "/font"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/lib", express.static(__dirname + "/lib"));
app.get("/", ngApp);

const port = 3011;
app.listen(port, function () { console.log("Server listening on port " + port + "..."); });