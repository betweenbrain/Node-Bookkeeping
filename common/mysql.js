/**
 * Created by mthomas on 1/1/17.
 */

const config = require('../config');
const mysql = require('mysql');

var pool = mysql.createPool({
    debug   : config.mysql.debug,
    host    : config.mysql.host,
    user    : config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

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
        sql = sql.split('?');

        if (!sql[sql.length - 1]) {
            sql.splice([sql.length - 1], 1)
        }

        var resp = '';

        for (var i = 0; i < sql.length; i++) {
            resp += sql[i] + params[i]
        }

        callback(resp)
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
