/**
 * Project    Node-Bookkeeping
 * File       itemModel.js
 * Created    1/14/17 6:28 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

const mysql = require('../common/mysql');

module.exports = {
    edit: function (req, callback) {
        switch (req.query.action) {
            case('update'):
                var params = [
                    req.query.category,
                    req.query.id
                ];

                var sql = 'UPDATE transaction ' +
                    'SET category = ? ' +
                    'WHERE id = ?';

                mysql.query(sql, params, function (err, rows) {
                    if (err) {
                        callback(err)
                    }

                    if (!err) {
                        callback(null, rows)
                    }
                });
                break;
            case('delete'):
                var params = [
                    req.query.id
                ];

                var sql = 'DELETE from transaction ' +
                    'WHERE id = ?';

                mysql.query(sql, params, function (err, rows) {
                    if (err) {
                        callback(err)
                    }

                    if (!err) {
                        callback(null, rows)
                    }
                });
                break;
        }
    }
};