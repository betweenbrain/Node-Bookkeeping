/**
 * Project    Node-Bookkeeping
 * File       adminModel.js
 * Created    1/14/17 2:18 PM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

const mysql = require('../common/mysql');

module.exports = {
    createTransTable: function (callback) {
        var sql = 'CREATE TABLE IF NOT EXISTS transaction ( ' +
            '`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
            '`amount` DECIMAL(8,2) NULL, ' +
            '`balance` DECIMAL(12, 2) NULL,' +
            '`category` VARCHAR(128) NULL, ' +
            '`check` INT NULL, ' +
            '`date` DATE NULL, ' +
            '`description` VARCHAR(255) NULL, ' +
            '`status` VARCHAR(128) NULL ' +
            ') ENGINE=INNODB;';

        mysql.query(sql, null, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                callback(null, rows)
            }
        })
    },

    createCatTable: function (callback) {
        'CREATE TABLE IF NOT EXISTS category ( ' +
        '`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
        '`name` VARCHAR(255) NOT NULL ' +
        ') ENGINE=INNODB;';

        mysql.query(sql, null, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                var params = [
                    'Operating Expenses',
                    'Uncategorized Expense',
                    'Alcohol & Tobacco',
                    'Entertainment',
                    'Cash Withdrawal or Transfer',
                    'Clothes',
                    'Credit Card & Loan Payment',
                    'Doctor, Dentist, etc.',
                    'Gifts',
                    'Groceries',
                    'Grooming & Beauty',
                    'Restaurants, Coffee & Bars',
                    'Books, Music, Movies & DVDs',
                    'Pharmacy & Prescriptions',
                    'Television',
                    'Utilities- Electricity',
                    'Utilities- Trash',
                    'Utilities- Propane',
                    'Charitable Gifts',
                    'Apps, software',
                    'Membership Dues',
                    'Retirement Investment',
                    'Medical',
                    'Health and Wellness',
                    'Recreation',
                    'Tools & Equipment',
                    'Office supplies, postage... etc.',
                    'Childcare',
                    'Local Property Tax',
                    'Beekeeping',
                    'Qualified Educator Expenses',
                    'CHET College Funds',
                    'Pets',
                    'Home Improvement & Maintenance',
                    'Mortgage or Rent',
                    'Mobile Phone',
                    'Bank & Credit Card Fees',
                    'Insurance – Life & Disability',
                    'Insurance – Vehicles',
                    'Furniture & Electronics',
                    'Utilities',
                    'Miscellaneous Expense',
                    'Travel & Vacation',
                    'Vehicle – Fuel',
                    'Vehicle – Repairs & Maintenance',
                    'Parking',
                    'Vehicle Purchase and Loans',
                    'Other Transportation',
                    'Total Operating Expenses'
                ];

                var sql = 'INSERT INTO category (`name`) ' +
                    'VALUES ';

                for (var i = 0; i < params.length; i++) {
                    sql += '(?)';

                    if (i < params.length - 1) {
                        sql += ','
                    }

                }

                mysql.query(sql, params, function (err, rows) {
                    if (err) {
                        reject(err)
                    }

                    if (!err) {
                        resolve(row)
                    }
                })
            }
        })
    },

    dropTransTable: function (callback) {
        var sql = 'DROP TABLE transaction;';

        mysql.query(sql, null, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                callback(null, rows)
            }
        })
    },

    dropTransTableNull: function (callback) {
        var sql = 'DELETE FROM transaction ' +
            'WHERE category IS NULL';

        mysql.query(sql, null, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                callback(null, rows)
            }
        })
    }
};
