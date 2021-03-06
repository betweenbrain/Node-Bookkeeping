/**
 * Project    simple-mvc
 * File       index.js
 * Created    1/14/17 8:24 AM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

var listModel = require('../models/listModel');

module.exports = function (app) {
    app.get('/', function (req, res) {
        listModel.categories(function (err, rows) {
            var categories = (!err)
                ? rows
                : null;

            listModel.accounts(function (err, rows) {
                var accounts = (!err)
                    ? rows
                    : null;

                var links = [
                    {
                        href: '/import',
                        text: 'Import transactions'
                    },
                    {
                        href: '/list',
                        text: 'List all transactions'
                    },
                    {
                        href : '/list/account/',
                        text : 'List all transactions by account',
                        accounts: accounts
                    },
                    {
                        href: '/list/category/',
                        text: 'List all transactions by category',
                        cats: categories
                    },
                    {
                        href: '/summary',
                        text: 'Display category balances'
                    }
                ];

                res.render('index', {
                    links  : links,
                    message: 'Welcome!'
                });
            });
        });
    })
};