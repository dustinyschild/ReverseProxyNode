require('dotenv').config();
const PORT = process.env.PORT || 8443;

// // Dependencies
const express = require("express");
const proxy = require("http-proxy-middleware");
const evh = require('express-vhost');

//placeholder for domain tests
const appFactory = function(echo) {
    var app = express();
    app.get('*', function(req, res) {
        res.send(req.path + " at " + echo);
    });

    return app;
};

const server = express();
server.use(evh.vhost(server.enabled('trust proxy')));
server.listen(PORT);

const { applications } = require("./config.json");
applications.forEach(app =>
    evh.register(
        app.domain,
        proxy({ target: app.target, changeOrigin: true })
    ));