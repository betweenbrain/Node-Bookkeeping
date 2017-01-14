/**
 * Project    Node-Bookkeeping
 * File       importMOdel.js
 * Created    1/14/17 2:29 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

const fs       = require('fs');
const moment   = require('moment');
const readline = require('readline');
var rowModel   = require('./rowModel');


module.exports = {

    import: function (callback) {
        var i            = 0;
        var rows         = 0;
        const importFile = require.resolve('../AccountHistory.csv');
        const rl         = readline.createInterface({
            input: fs.createReadStream(importFile)
        });

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
                    amount     : (line[4] == '') ? line[5] : -Math.abs(line[4]),
                    status     : (line[6] == '') ? null : line[6],
                    balance    : (line[7] == '') ? null : line[7]
                };

                rowModel.processRow(row, function (err, data) {
                    if (err) {
                        // console.log(err)
                    }
                    if (!err) {
                        rows++;
                    }
                });
            }

            i++;
        });

        rl.on('close', function () {
            callback(null, i + ' rows processed')
        })
    }
};