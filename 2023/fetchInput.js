//commonjs
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
var argv = require('minimist')(process.argv.slice(2));

if (argv["d"]) {
	const day = parseInt(argv["d"])
	
	if (isNaN(day)) {
		console.log("[-d] flag requires an integer value")
		return
	}

	const fullFolderPath = path.join(process.cwd(), `day${day}`)
	if (!fs.existsSync(fullFolderPath)) {
		if (!argv["c"]) {
			console.log("folder nonexistence, use [-c] to create parent folder")
			return
		}

		fs.mkdirSync(fullFolderPath)
	}

	const fullFilePath = path.join(fullFolderPath, 'input.txt')
	if (fs.existsSync(fullFilePath) && !argv["o"]) {
		console.log("file already existed, use [-o] to overwrite file")
		return
	}

	const filePath = fs.createWriteStream(`day${day}/input.txt`);
	const request = https.get({
		hostname: `adventofcode.com`,
		path: `/2023/day/${day}/input`,
		method: 'GET',
		headers: {
			cookie: `session=${process.env.SESSION_COOKIE}`
		}
	}, (response) => {
		response.pipe(filePath);

		filePath.on("finish", () => {
			filePath.close();
			console.log(`download completed for day ${argv["d"]}, find in ./day${argv["d"]}/`);
		});
	});
} else {
	console.log("usage: fetchInput.js [-d] (required) <integer> puzzle day \n\t\t     [-c] create containing folder \n\t\t     [-o] overwrite if existed")
}

