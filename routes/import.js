/**
 * Project    Node-Bookkeeping
 * File       import.js
 * Created    1/14/17 2:28 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

var importModel = require('../models/importModel');

module.exports = function (app) {
    app.get('/', function (req, res) {
        importModel.import(function (err, data) {
            if (err) {
                res.status(400);
                res.render('index', {message: err});
            }
            if (!err) {
                res.render('index', {message: data});
            }
        })
    });
};