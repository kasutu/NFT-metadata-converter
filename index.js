// init
const fs = require('fs');
const fsp = require('fs').promises;

// directories
const binDir = './bin';

// global variables
let fileCount;
let progress;
let tempMetadata;
const metadataArr = [];
const errorArr = [];

// global functions
function print(str) {
	console.log('-------------------------------------------------------------');
	console.log('>', str);
	console.log('-------------------------------------------------------------');
}

function printErr(error) {
	console.log('#############################################################');
	console.log('!', error);
	console.log('#############################################################');
}

// init file count
print('INITIALIZING...');
let promise = new Promise(function (resolve, reject) {
	// check for errors
	fs.readdir(binDir, (err, files) => {
		if (err) {
			reject();
			errorArr.push(err);
		} else {
			resolve();
			fileCount = files.length;
		}
	});
});

// test the promise
promise
	.then(function () {
		// do stuff here
		print([`Files inside ${binDir}:`, fileCount]);
		print('LOADING DATA...');
		loadData();
	})
	.catch(function () {
		// init failed
		printErr(['Not a local directory', errorArr]);
	});

// read all data in files
function loadData() {
	// read files
	for (let i = 0; i <= fileCount; i++) {
		if (i > 0) {
			fsp.readFile(`${binDir}/${i}.json`, 'utf-8').then((jsonString) => {
				// check and save data
				const data = JSON.parse(jsonString);
				// print([`loading file: ${i}.json`, data.name]);
				metadataArr.push(data);
				progress = i;
				if (progress === fileCount) {
					// execute function
					print('DONE LOADING DATA...');
					retrieveData();
				}
			});
		}
	}
}

function retrieveData() {
	print(['Data loaded:', metadataArr.length]);
	tempMetadata = {};
}

function writeMetadata() {
	// do stuff
	const jsonString = JSON.stringify(customer);
	console.log(jsonString);
	// => "{"name":"Newbie Co.","address":"Po Box City","order_count":0}"
}
