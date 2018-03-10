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
        var start = (req.query.start) ? req.query.start : 0;
        listModel.list(null, null, start, function (err, data) {
            if (err) {
                res.status(400);
                res.render('index', {message: err});
            }
            if (!err) {
                res.render('list', {
                    rows: data.trans,
                    cats: data.cats,
                    start: Number(start),
                    next: (Number(start) + 50),
                    prev: (Number(start) - 50)
                });
            }
        })
    });

    app.get('/account/', function (req, res) {
        listModel.list(req.body.account, null, function (err, data) {
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

    app.get('/category/', function (req, res) {
        listModel.list(null, req.body.catId, function (err, data) {
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