/**
 * Created by mthomas on 1/2/17.
 */

const moment = require('moment');
const mysql = require('../common/mysql');
const Promise = require('promise');

var formatHeader = function (i, header, line, obj) {
    return new Promise(function (resolve, reject) {
        header = header.toLowerCase();

        if (header.indexOf('date') >= 0) {
            obj['date'] = (line[i] == '') ? null : moment(line[i]).format('YYYY-MM-DD');

            resolve(obj)
        }

        if (header.indexOf('date') == -1) {
            var parts = header.split(' ');
            var str = parts[0];

            for (var j = 1; j < parts.length; j++) {
                str += parts[j].substring(0, 1).toUpperCase();
                str += parts[j].substring(1, parts[j].length);

                if (j == parts.length - 1) {
                    obj[str] = (line[i] == '') ? null : line[i];

                    resolve(obj)
                }
            }
        }
    });
};

module.exports = {

    /**
     * Convert row to object
     *
     * @param headers
     * @param line
     * @param callback
     */
    lineObj: function (headers, line, callback) {
        var obj = {};
        var promises = headers.map(function (header, i) {
                return formatHeader(i, header, line, obj)
            }
        );

        var results = Promise.all(promises);

        results
            .then(function (data) {
                callback(data)
            });
    },

    /**
     * Check if row already exists in DB
     *
     * @param date
     * @param desc
     * @param credit
     * @param debit
     * @returns {Promise}
     */
    isDuplicate: function (row) {
        return new Promise(function (resolve, reject) {
            var params = [
                row.date,
                row.description,
                row.credit,
                row.debit
            ];

            var sql = 'SELECT IF(COUNT(*) > 0, true, false) AS duplicate ' +
                'FROM transactions ' +
                'WHERE date = ? ' +
                'AND description = ? ' +
                'AND credit = ? ' +
                'AND debit = ?';

            mysql.query(sql, params, function (err, rows) {
                if (err) {
                    reject(err)
                }

                if (!err) {
                    if (rows[0].duplicate) {
                        var err = {
                            code: 'Row exists'
                        };

                        reject(err);
                    }

                    if (!rows[0].duplicate) {
                        resolve()
                    }
                }
            });
        })
    }
};