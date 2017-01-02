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

const mysql = require('./common/mysql');
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: fs.createReadStream('AccountHistory.csv')
});

rl.on('line', function (line) {
    if (i == 0) {
        headers = line.split(',');
        console.log(headers);
    }

    i++;
});

if (process.argv.indexOf('--create') >= 0) {
    var sql = 'CREATE TABLE IF NOT EXISTS transactions ( ' +
        '`date` DATE, ' +
        '`check` INT, ' +
        '`description` VARCHAR(255), ' +
        '`debit` DECIMAL(8, 2), ' +
        '`credit` DECIMAL(8,2), ' +
        '`status` VARCHAR(156), ' +
        '`balance` DECIMAL(12, 2) ' +
        ') ENGINE=INNODB;';

    mysql.query(sql, null, function (err, rows) {
        if(err){
            console.log(err)
        }

        if(!err){
            console.log(rows)
        }
    })
}

if (process.argv.indexOf('--drop') >= 0) {
    var sql = 'DROP TABLE transactions;';

    mysql.query(sql, null, function (err, rows) {
        if(err){
            console.log(err)
        }

        if(!err){
            console.log(rows)
        }
    })
}