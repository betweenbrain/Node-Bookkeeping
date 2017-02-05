/**
 * Project    Node-Bookkeeping
 * File       admin.js
 * Created    1/14/17 2:18 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

var adminModel = require('../models/adminModel');

module.exports = function (app) {
    app.get('/create', function (req, res) {
        adminModel.createTransTable(function (err, data) {
            if (err) {
                res.status(400);
                res.render('index', {message: err});
            }
            if (!err) {
                res.render('index', {message: data});
            }
        })
    });

    app.get('/drop', function (req, res) {
        adminModel.dropTransTable(function (err, data) {
            if (err) {
                res.status(400);
                res.render('index', {message: err});
            }
            if (!err) {
                res.render('index', {message: data});
            }
        })
    });

    app.get('/drop/null', function (req, res) {
        adminModel.dropTransTableNull(function (err, data) {
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