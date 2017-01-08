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
            row.date,
            row.description,
            strings.imported
        ];

        if (row.credit) {
            params.push(row.credit)
        }

        if (row.debit) {
            params.push(row.debit)
        }

        var sql = 'SELECT IF(COUNT(*) > 0, true, false) AS duplicate ' +
            'FROM transactions ' +
            'WHERE date = ? ' +
            'AND description = ? ' +
            'AND status = ? ';

        if (row.credit) {
            sql += 'AND credit = ? ';
        }

        if (row.debit) {
            sql += 'AND debit = ? ';
        }

        mysql.query(sql, params, function (err, rows) {
            if (err) {
                reject(err)
            }

            if (!err) {
                if (rows[0].duplicate) {
                    reject(strings.isDuplicate)
                }

                if (!rows[0].duplicate) {
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
            'FROM transactions ' +
            'WHERE description = ? ' +
            'AND EXISTS ' +
            '(' +
            'SELECT category ' +
            'FROM transactions ' +
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
            row.credit,
            row.date,
            row.debit,
            row.description
        ];

        var sql = 'SELECT IF(COUNT(*) > 0, ?, ?) AS status ' +
            'FROM transactions ' +
            'WHERE EXISTS ' +
            '(' +
            'SELECT category ' +
            'FROM transactions ' +
            'WHERE credit = ? ' +
            'AND date = ? ' +
            'AND debit = ? ' +
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
            row.balance,
            row.category,
            row.check,
            row.credit,
            row.date,
            row.debit,
            row.description,
            row.status
        ];

        var sql = 'INSERT INTO transactions ( ' +
            '`balance`, ' +
            '`category`, ' +
            '`check`, ' +
            '`credit`, ' +
            '`date`, ' +
            '`debit`, ' +
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