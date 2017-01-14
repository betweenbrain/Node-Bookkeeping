/**
 * Project    Node-Bookkeeping
 * File       adminModel.js
 * Created    1/14/17 2:18 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

const mysql = require('../common/mysql');

module.exports = {
    create: function (callback) {
        var sql = 'CREATE TABLE IF NOT EXISTS transactions ( ' +
            '`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
            '`balance` DECIMAL(12, 2) NULL,' +
            '`category` VARCHAR(128) NULL, ' +
            '`check` INT NULL, ' +
            '`credit` DECIMAL(8,2) NULL, ' +
            '`date` DATE NULL, ' +
            '`debit` DECIMAL(8, 2) NULL, ' +
            '`description` VARCHAR(255) NULL, ' +
            '`status` VARCHAR(128) NULL ' +
            ') ENGINE=INNODB;';

        mysql.query(sql, null, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                callback(null, rows)
            }
        })
    },

    drop: function (callback) {
        var sql = 'DROP TABLE transactions;';

        mysql.query(sql, null, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                callback(null, rows)
            }
        })
    }
}
