/**
 * Project    Node-Bookkeeping
 * File       filterModel.js
 * Created    3/3/17 4:51 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

const mysql = require('../common/mysql');

module.exports = {
    getCats: function (callback) {
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

    getFilters: function (callback) {
        var sql = 'SELECT c.name AS catName, f.term AS filterTerm ' +
            'FROM filter AS f ' +
            'JOIN category AS c ' +
            'ON f.catId = c.id';

        mysql.query(sql, null, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                callback(null, rows)
            }
        })
    },

    setFilter: function (req, callback) {
        var params = [
            req.body.catId,
            req.body.term
        ];

        var sql = 'INSERT into filter ' +
            '(catId, term) ' +
            'VALUES ' +
            '( ?, ?)';

        mysql.query(sql, params, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                callback(null, rows)
            }
        })
    }
};