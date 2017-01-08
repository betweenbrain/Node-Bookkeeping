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

const fs       = require('fs');
const moment   = require('moment');
const mysql    = require('./common/mysql');
const readline = require('readline');
var rowModel   = require('./models/rowModel');
const rl       = readline.createInterface({
    input: fs.createReadStream('AccountHistory.csv')
});

if (process.argv.length == 2) {
    rl.on('line', function (line) {
        line = line
            .replace(/"/g, '')
            .split(',');

        if (i == 0) {
            headers = line;
        }

        if (i >= 1) {
            var row = {
                date       : (line[1] == '') ? null : moment(line[1]).format('YYYY-MM-DD'),
                check      : (line[2] == '') ? null : line[2],
                description: (line[3] == '') ? null : line[3],
                debit      : (line[4] == '') ? null : line[4],
                credit     : (line[5] == '') ? null : line[5],
                status     : (line[6] == '') ? null : line[6],
                balance    : (line[7] == '') ? null : line[7]
            };

            rowModel.processRow(row, function (err, data) {
                if (err) {
                    // console.log(err)
                }
                if (!err) {
                    // console.log('Imported row ' + i)
                }
            });
        }

        i++;
    });

    rl.on('close', function () {
        // process.exit(0);
    })
}

if (process.argv.indexOf('--create') >= 0) {
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
