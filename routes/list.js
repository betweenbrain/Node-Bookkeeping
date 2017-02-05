/**
 * Project    Node-Bookkeeping
 * File       list.js
 * Created    1/14/17 4:11 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

var listModel = require('../models/listModel');

module.exports = function (app) {
    app.get('/', function (req, res) {
        listModel.list(function (err, data) {
            if (err) {
                res.status(400);
                res.render('index', {message: err});
            }
            if (!err) {
                res.render('list', {
                    rows: data.trans,
                    cats: data.cats
                });
            }
        })
    });
};