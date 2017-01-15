/**
 * Project    Node-Bookkeeping
 * File       item.js
 * Created    1/14/17 6:28 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

var itemModel = require('../models/itemModel');

module.exports = function (app) {
    app.get('/', function (req, res) {
        itemModel.edit(req, function (err, data) {
            if (err) {
                res.status(400);
                res.render('index', {message: err});
            }
            if (!err) {
                res.redirect('/list');
            }
        })
    });
};