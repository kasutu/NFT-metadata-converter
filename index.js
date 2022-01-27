// init
const fs = require('fs');
const colors = require('colors');

// directories
const binDir = './bin';
const outputDir = './output';

// global variables
let startPace;
const metadataArr = [];

// global functions
function print(log) {
	// logs in console
	console.log('-------------------------------------------------------------');
	console.log(log);
	// console.log('-------------------------------------------------------------');
}

function printErr(error) {
	// error log handler
	console.log('#############################################################');
	console.log({ error });
	// console.log('#############################################################');
}

async function countFiles(dir) {
	// working total file counter
	return new Promise((resolve, reject) =>
		fs.readdir(dir, (err, files) =>
			err ? reject(printErr(err)) : resolve(files.length)
		)
	);
}

async function makeSequence(length) {
	// makes a code firing sequence
	print('sequencing...'.blue);
	const sequence = [];

	// make an array of numbers 1 to length
	for (let i = 0; i < length; i++) {
		sequence.push(i + 1);
	}

	print('done sequencing...'.yellow);
	return sequence;
}

async function checkFolder(dir) {
	// check folder for available files
	print('checking folder for files...'.blue);

	return new Promise((resolve, reject) =>
		fs.readdir(dir, (err, files) =>
			err ? reject(printErr(err)) : resolve(files)
		)
	);
}

async function getData(dir, fileName) {
	// grabs the data inside a json file
	console.log(`grabbing data from: [  ${fileName}  ]`.blue);

	return new Promise((resolve, reject) => {
		// check and save data
		fs.readFile(`${dir}/${fileName}`, 'utf-8', (err, jsonStr) => {
			err ? reject(printErr(err)) : resolve(JSON.parse(jsonStr));
		});
	});
}

async function pushMeta(files, dir, arr) {
	// read each files and push it to an array
	for (const file of files) {
		const meta = await getData(dir, file);
		arr.push(meta.name);
		console.log(`pushed: [  ${file}  ]`.yellow);
	}
}

const initialize = async () => {
	// executes functions in order
	print('INITIALIZING...'.yellow);

	// checks folder for available files
	const files = await checkFolder(binDir);
	console.log('files:', files);
	
	// push all data to array
	await pushMeta(files, binDir, metadataArr);

	print(metadataArr);
	print('DONE INIT...'.yellow);
};

// ----------Init----------//
initialize();
