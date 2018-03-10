/**
 * Project    Node-Bookkeeping
 * File       summary.js
 * Created    2/12/17 6:35 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

var summaryModel = require('../models/summaryModel');

module.exports = function (app) {
    app.get('/', function (req, res) {
        summaryModel.get(function (err, data) {
            if (err) {
                res.status(400);
                res.render('index', {message: err});
            }
            if (!err) {
                res.render('summary', {rows: data});
            }
        })
    })
};
