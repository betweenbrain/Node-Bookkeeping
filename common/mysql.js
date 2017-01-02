/**
 * Created by mthomas on 1/1/17.
 */

const config = require('../config');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host        : config.mysql.host,
    user        : config.mysql.user,
    password    : config.mysql.password,
    database    : config.mysql.database,
    insecureAuth: true
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

module.exports = {
    debug: function (sql, params, callback) {
        sql = sql.split('?');
        var resp = '';

        for(var i = 0; i < sql.length; i++){
            resp += sql[i] + params[i]
        }

        callback(resp)
    },

    query: function (sql, params, callback) {
        connection.query(sql, params, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                callback(null, rows)
            }
        });

        connection.end();
    }
};
