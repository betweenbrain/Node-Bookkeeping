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
    const fileUpload = require('express-fileupload');
    app.use(fileUpload());

    app.get('/', function (req, res) {
        res.render('import');
    });

    app.post('/', function (req, res) {
        if (!req.files.importFile) {
            res.status(400);
            res.render('index', {message: 'No files were uploaded.'});
        }

        if (req.files.importFile) {
            var importFile = req.files.importFile;
            var filePath   = __dirname + '/../' + importFile.name;

            // Use the mv() method to place the file somewhere on your server
            importFile.mv(filePath, function (err) {
                if (err) {
                    res.status(500);
                    res.render('index', {message: err});
                }

                if (!err) {
                    importModel.import(filePath, function (err, data) {
                        if (err) {
                            res.status(400);
                            res.render('index', {message: err});
                        }
                        if (!err) {
                            res.render('index', {message: data});
                        }
                    })
                }
            });
        }
    });
};