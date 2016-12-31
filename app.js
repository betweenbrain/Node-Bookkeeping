/**
 * File
 * Created    12/31/16 3:59 PM
 * Author     Matt Thomas | matt@betweenbrain.com | http://betweenbrain.com
 * Support    https://github.com/betweenbrain/
 * Copyright  Copyright (C) 2016 betweenbrain llc. All Rights Reserved.
 * License    GNU GPL v2 or later
 */

var headers;
var i = 0;

const readline = require('readline');
const fs       = require('fs');
const rl       = readline.createInterface({
	input: fs.createReadStream('AccountHistory.csv')
});

rl.on('line', function (line) {
	if (i == 0) {
		headers = line.split(',')
	}

	// console.log(line);
	i++;
});