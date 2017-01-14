/**
 * Project    simple-mvc
 * File       index.js
 * Created    1/14/17 8:24 AM
 * Author     Matt Thomas
 * Email      matt.thomas@searshc.com
 * Copyright  Copyright (C) 2017 Sears Holdings. All Rights Reserved.
 */

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {message: 'Welcome!'});
    })
}