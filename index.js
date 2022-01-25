// global variables
const fs = require('fs');
const binDir = './bin';

// let dataStr;

// global functions
function READ_JSON(fileName) {
	fs.readFile(`./bin/${fileName}.json`, 'utf-8', (err, jsonString) => {
		if (err) {
			console.log('File read failed:', err);
			return;
		} else {
			try {
				// json file contents
				const data = JSON.parse(jsonString);
				console.log(data);
			} catch (err) {
				console.log('JSON parsing error', err);
			}
		}
	});
}

function WRITE_JSON(fileName, obj) {
	fs.writeFile(
		`./output/${fileName}.json`,
		JSON.stringify(obj, null, 2),
		(err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('File successfully written!');
			}
		}
	);
}

function FILE_COUNT() {
	fs.readdir(binDir, (err, files) => {
		console.log('Number of Files:', files.length);
	});
}

// execution
READ_JSON('1');
FILE_COUNT();
// console.log(dataStr);

