/**
 * Created by mthomas on 1/2/17.
 */

const moment  = require('moment');
const mysql   = require('../common/mysql');
const Promise = require('promise');
const strings = require('../strings');

var checkDuplicate = function (row) {
    return new Promise(function (resolve, reject) {
        var params = [
            row.account,
            row.amount,
            row.date,
            row.description,
            strings.imported
        ];

        var sql = 'SELECT IF(COUNT(*) > 0, true, false) AS duplicate ' +
            'FROM transaction ' +
            'WHERE account = ? ' +
            'AND amount = ? ' +
            'AND date = ? ' +
            'AND description = ? ' +
            'AND status = ? ';

        mysql.query(sql, params, function (err, rows) {
            if (err) {
                reject(err)
            }

            if (!err) {
                if (rows[0].duplicate == 1) {
                    reject(strings.isDuplicate)
                }

                if (rows[0].duplicate == 0) {
                    resolve(row)
                }
            }
        })
    });
};

var getCategory = function (row) {
    return new Promise(function (resolve, reject) {
        var params = [
            row.description,
            row.description
        ];

        var sql = 'SELECT category ' +
            'FROM transaction ' +
            'WHERE description = ? ' +
            'AND EXISTS ' +
            '(' +
            'SELECT category ' +
            'FROM transaction ' +
            'WHERE description = ?' +
            ');';

        mysql.query(sql, params, function (err, rows) {
            if (err) {
                reject(err)
            }

            if (!err) {
                row.category = (rows.length > 0)
                    ? rows[0].category
                    : null;

                resolve(row)
            }
        })
    })
};

var getStatus = function (row) {
    return new Promise(function (resolve, reject) {
        var params = [
            strings.maybeDuplicate,
            strings.imported,
            row.account,
            row.amount,
            row.date,
            row.description
        ];

        var sql = 'SELECT IF(COUNT(*) > 0, ?, ?) AS status ' +
            'FROM transaction ' +
            'WHERE EXISTS ' +
            '(' +
            'SELECT category ' +
            'FROM transaction ' +
            'WHERE account = ? ' +
            'AND amount = ? ' +
            'AND date = ? ' +
            'AND description = ?' +
            ');';

        mysql.query(sql, params, function (err, rows) {
            if (err) {
                reject(err)
            }

            if (!err) {
                row.status = rows[0].status;

                resolve(row)
            }
        })
    })
};

var importRow = function (row) {
    return new Promise(function (resolve, reject) {
        var params = [
            row.account,
            row.amount,
            row.balance,
            row.category,
            row.check,
            row.date,
            row.description,
            row.status
        ];

        var sql = 'INSERT INTO transaction ( ' +
            '`account`, ' +
            '`amount`, ' +
            '`balance`, ' +
            '`category`, ' +
            '`check`, ' +
            '`date`, ' +
            '`description`, ' +
            '`status`) ' +
            'VALUES ( ' +
            '?, ' +
            '?, ' +
            '?, ' +
            '?, ' +
            '?, ' +
            '?, ' +
            '?, ' +
            '?);';

        mysql.query(sql, params, function (err, rows) {
            if (err) {
                reject(err)
            }

            if (!err) {
                resolve(row)
            }
        })
    })
};

module.exports = {
    processRow: function (row, callback) {
        checkDuplicate(row)
            .then(getCategory)
            .then(getStatus)
            .then(importRow)
            .then(function (data) {
                callback(null, data)
            })
            .catch(function (err) {
                callback(err)
            });
    }
};