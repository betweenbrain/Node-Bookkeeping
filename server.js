/**
 * Project    Node-Bookkeeping
 * File       server.js
 * Created    1/14/17 2:12 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

const bodyParser = require('body-parser');
const express    = require('express');
const enrouten   = require('express-enrouten');
const exphbs     = require('express-handlebars');
var app          = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(
    // Set query parameters as req.body for consistency
    function (req, res, next) {
        if (req.method === 'GET' || req.method === 'DELETE') {
            req.body = req.query
        }
        next()
    },
    bodyParser.urlencoded({extended: true}),
    express.static('public')
);
app.use(enrouten({directory: 'routes'}));

app.listen(8080);