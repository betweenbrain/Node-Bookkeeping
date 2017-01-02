/**
 * File
 * Created    12/31/16 3:59 PM
 * Author     Matt Thomas | matt@betweenbrain.com | http://betweenbrain.com
 * Support    https://github.com/betweenbrain/
 * Copyright  Copyright (C) 2016 betweenbrain llc. All Rights Reserved.
 * License    GNU GPL v2 or later
 */

var headers;
var i = 0;

const moment = require('moment');
const mysql = require('./common/mysql');
const readline = require('readline');
const rowModel = require('./models/rowModel');
const fs = require('fs');
const rl = readline.createInterface({
    input: fs.createReadStream('AccountHistory.csv')
});

if (process.argv.length == 2) {
    var params = [];
    var sql = 'INSERT INTO transactions ( ' +
        '`date`, ' +
        '`check`, ' +
        '`description`, ' +
        '`debit`, ' +
        '`credit`, ' +
        '`status`, ' +
        '`balance`) ' +
        'VALUES ';

    rl.on('line', function (line) {
        line = line
            .replace(/"/g, '')
            .split(',');

        if (i == 0) {
            headers = line;
        }

        if (i >= 1) {
            // Format date as MySQL DATE format
            params.push()
            // Set as NULL if empty string
            params.push(line[2] = (line[2] == '') ? null : line[2]);
            params.push(line[3] = (line[3] == '') ? null : line[3]);
            params.push(line[4] = (line[4] == '') ? null : line[4]);
            params.push(line[5] = (line[5] == '') ? null : line[5]);
            params.push(line[6] = (line[6] == '') ? null : line[6]);
            params.push(line[7] = (line[7] == '') ? null : line[7]);

            if (i >= 2) {
                sql += ', ';
            }

            sql += '( ' +
            '?, ' +
            '?, ' +
            '?, ' +
            '?, ' +
            '?, ' +
            '?, ' +
            '? ' +
            ')';
        }

        i++;
    });

    rl.on('close', function () {
        sql += ';'

        mysql.debug(sql, params, function (data) {
            console.log(data)
        });

        mysql.query(sql, params, function (err, rows) {
            if (err) {
                console.log(err)
            }

            if (!err) {
                console.log(rows)
            }
        });
    })
}

if (process.argv.indexOf('--create') >= 0) {
    var sql = 'CREATE TABLE IF NOT EXISTS transactions ( ' +
        '`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ' +
        '`date` DATE NULL, ' +
        '`check` INT NULL, ' +
        '`description` VARCHAR(255) NULL, ' +
        '`debit` DECIMAL(8, 2) NULL, ' +
        '`credit` DECIMAL(8,2) NULL, ' +
        '`status` VARCHAR(156) NULL, ' +
        '`balance` DECIMAL(12, 2) NULL,' +
        '`category` VARCHAR(156) NULL ' +
        ') ENGINE=INNODB;';

    mysql.query(sql, null, function (err, rows) {
        if (err) {
            console.log(err)
        }

        if (!err) {
            console.log(rows)
        }
    })
}

if (process.argv.indexOf('--drop') >= 0) {
    var sql = 'DROP TABLE transactions;';

    mysql.query(sql, null, function (err, rows) {
        if (err) {
            console.log(err)
        }

        if (!err) {
            console.log(rows)
        }
    })
}