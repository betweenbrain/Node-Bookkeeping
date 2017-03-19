/**
 * Project    Node-Bookkeeping
 * File       listModel.js
 * Created    1/14/17 4:11 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

const mysql = require('../common/mysql');

module.exports = {
    categories: function (callback) {
        var sql = 'SELECT id AS catId, name AS catName FROM category';

        mysql.query(sql, null, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                callback(null, rows)
            }
        })
    },

    list: function (catId, callback) {
        var catId = (catId)
            ? catId
            : null;

        var params = (catId)
            ? [catId]
            : null;

        var sql = 'SELECT id, date, description, amount, balance, category, status, ' +
            '(SELECT c.name ' +
            'FROM category AS c ' +
            'JOIN transaction AS t ' +
            'ON t.category = c.id ' +
            'WHERE t.category ' +
            'IS NOT NULL ' +
            'AND t.id = transaction.id ' +
            ') as categoryName ' +
            'FROM transaction ';

        sql += (catId)
            ? 'WHERE category = ? ORDER BY date DESC'
            : 'ORDER BY date DESC';

        mysql.query(sql, params, function (err, trans) {
            if (err) {
                callback(err)
            }

            if (!err) {
                var sql = 'SELECT id AS catId, name AS catName FROM category';

                mysql.query(sql, null, function (err, cats) {
                    if (err) {
                        callback(err)
                    }

                    if (!err) {
                        var results = {
                            cats : cats,
                            trans: trans
                        };

                        callback(null, results)
                    }
                })
            }
        })
    }
};