// const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/dbconnection")
const config = require("./config/config");
const routes = require("./routers/v1");
const app = express();
const http = require("http");
const path = require("path")

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,`./public`)));

connectDB();

app.use("/v1", routes);

app.use((req, res, next) => {
    next(new Error("Route not found!"));
});

const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`server listning port number ${config.port}!`);
});