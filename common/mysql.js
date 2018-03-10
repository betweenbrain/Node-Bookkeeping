/**
 * Created by mthomas on 1/1/17.
 */

const config = require('../config');
const mysql  = require('mysql');

var pool = mysql.createPool(
    config.mysql
);

pool.getConnection(function (err, connection) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    if (!err) {
        console.log('connected as id ' + connection.threadId);
        connection.release();
    }
});

module.exports = {
    debug: function (sql, params, callback) {
        if (sql.indexOf('?') >= 0) {
            var matches = sql.match(/\?/g).length;

            for (var i = 0; i <= matches; i++) {
                sql = sql.replace(/\?/, '"' + params[i] + '"')
            }
        }

        callback(sql)
    },

    query: function (sql, params, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, params, function (err, rows) {
                if (err) {
                    callback(err)
                }

                if (!err) {
                    callback(null, rows)
                }

                connection.release();
            });
        })
    }
};
