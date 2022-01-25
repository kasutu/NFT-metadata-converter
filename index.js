// global variables
const fs = require('fs');

// global functions
function READ_JSON(fileName) {
	fs.readFile(`./bin/${fileName}.json`, 'utf-8', (err, jsonString) => {
		if (err) {
			console.log('File read failed:', err);
			return;
		}
		console.log('File data:', jsonString);
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

// execution
console.log(readJsonFile('1'));
