/**
 * Project    Node-Bookkeeping
 * File       filter.js
 * Created    3/3/17 4:42 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

var filterModel = require('../models/filterModel');

module.exports = function (app) {
    app.get('/', function (req, res) {
        filterModel.getCats(function (err, catRows) {
            if (err) {
                res.render('index', {message: err.message});
            }
            if (!err) {
                filterModel.getFilters(function (err, filterRows) {
                    if (err) {
                        res.render('index', {message: err.message});
                    }
                    if (!err) {
                        res.render('filter', {
                            cats  : catRows,
                            filter: filterRows
                        });
                    }
                })
            }
        })
    });

    app.post('/', function (req, res) {
        filterModel.setFilter(req, function (err, rows) {
            if (err) {
                res.render('index', {message: err.message});
            }
            if (!err) {
                res.redirect('/filter');
            }
        })
    });
};