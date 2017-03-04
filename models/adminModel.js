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
            '`account` VARCHAR(64) NOT NULL ' +
            '`amount` DECIMAL(8,2) NULL, ' +
            '`balance` DECIMAL(12, 2) NULL,' +
            '`category` INT NULL, ' +
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
        var sql = 'CREATE TABLE IF NOT EXISTS category ( ' +
            '`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
            '`name` VARCHAR(255) NOT NULL UNIQUE ' +
            ') ENGINE=INNODB;';

        mysql.query(sql, null, function (err, rows) {
            if (err) {
                callback(err)
            }

            if (!err) {
                var params = [
                    'Alcohol & Tobacco',
                    'Apps, software',
                    'Bank & Credit Card Fees',
                    'Beekeeping',
                    'Books, Music, Movies & DVDs',
                    'Cash Withdrawal or Transfer',
                    'Charitable Gifts',
                    'CHET College Funds',
                    'Childcare',
                    'Clothes',
                    'Credit Card & Loan Payment',
                    'Doctor, Dentist, etc.',
                    'Education Expenses',
                    'Entertainment',
                    'Furniture & Electronics',
                    'Gifts',
                    'Groceries',
                    'Grooming & Beauty',
                    'Health and Wellness',
                    'Home Improvement & Maintenance',
                    'Income - Salaries',
                    'Insurance – Life & Disability',
                    'Insurance – Vehicles',
                    'Local Property Tax',
                    'Medical',
                    'Membership Dues',
                    'Miscellaneous Expense',
                    'Mobile Phone',
                    'Mortgage or Rent',
                    'Office supplies, postage... etc.',
                    'Operating Expenses',
                    'Other Transportation',
                    'Parking',
                    'Pets',
                    'Pharmacy & Prescriptions',
                    'Qualified Educator Expenses',
                    'Recreation',
                    'Restaurants, Coffee & Bars',
                    'Retirement Investment',
                    'Retirement Investment Withdrawal',
                    'Television',
                    'Tools & Equipment',
                    'Total Operating Expenses',
                    'Travel & Vacation',
                    'Uncategorized Expense',
                    'Utilities - Electricity',
                    'Utilities - Propane',
                    'Utilities - Trash',
                    'Utilities',
                    'Vehicle – Fuel',
                    'Vehicle – Repairs & Maintenance',
                    'Vehicle Purchase and Loans'
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
                        callback(err)
                    }

                    if (!err) {
                        callback(null, rows)
                    }
                })
            }
        })
    },

    createFilterTable: function (callback) {
        var sql = 'CREATE TABLE IF NOT EXISTS filter ( ' +
            '`catId` INT NOT NULL, ' +
            '`term` VARCHAR(255) NOT NULL ' +
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
