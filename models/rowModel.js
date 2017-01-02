/**
 * Created by mthomas on 1/2/17.
 */

const mysql = require('../common/mysql');
const Promise = require('promise');

module.exports = {

    /**
     * Check if row already exists in DB
     *
     * @param date
     * @param desc
     * @param credit
     * @param debit
     * @returns {Promise}
     */
    isDuplicate: function (date, desc, credit, debit) {
        return new Promise(function (resolve, reject) {
            var params = [
                date = (date) ? date : null,
                desc = (desc) ? desc : null,
                credit = (credit) ? credit : null,
                debit = (debit) ? debit : null,
            ]

            var sql = 'SELECT IF(COUNT(*) > 0, true, false) AS duplicate ' +
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
                        }

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