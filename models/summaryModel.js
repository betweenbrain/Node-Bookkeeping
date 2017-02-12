/**
 * Project    Node-Bookkeeping
 * File       summaryModel.js
 * Created    2/12/17 6:42 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

const mysql = require('../common/mysql');

module.exports = {
    get: function (callback) {

        var sql = 'SELECT c.name AS category, SUM(t.amount) AS amount ' +
            'FROM `transaction` AS t ' +
            'JOIN `category` AS c ' +
            'ON t.category = c.id ' +
            'GROUP BY c.name';

        mysql.query(sql, null, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                callback(null, rows)
            }
        })
    }
};