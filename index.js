// init
const fs = require('fs');
const fsp = require('fs').promises;
const util = require('util');

// Convert callback based methods to promise
// based methods
const readdirp = util.promisify(fs.readdir);

// directories
const binDir = './bin';

// global variables
const metadataArr = [];
const errorArr = [];

// global functions
function print(log) {
	// logs in console
	console.log('-------------------------------------------------------------');
	console.log({ log });
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

async function checkFolder(dir) {
	// working total file counter
	return new Promise((resolve, reject) =>
		fs.readdir(dir, (err, files) =>
			err ? reject(printErr(err)) : resolve(files)
		)
	);
}

async function makeSequence(length) {
	// makes a code firing sequence
	print('sequencing...');
	const sequence = [];

	// make an array of numbers 1 to length
	for (let i = 0; i < length; i++) {
		sequence.push(i + 1);
	}

	print('done sequencing...');
	return sequence;
}

async function getResult(dir, id) {
	return new Promise((resolve, reject) => {
		// check and save data
		fs.readFile(`${dir}/${id}.json`, 'utf-8', (err, jsonStr) => {
			err
				? reject(printErr(err))
				: resolve(metadataArr.push(JSON.parse(jsonStr)));
		});
	});
}

async function grabData(arr, dir) {
	// read files
	arr.forEach((num) => {
		console.log(num);
		print(metadataArr.length);
		getResult(dir, num);
	});
}

const initialize = async () => {
	// executes functions in order
	print('INITIALIZING...');
	const files = await checkFolder(binDir);
	print(['files:', files]);

	files.forEach((element) => {
		console.log(element);
	});
	
	const count = await countFiles(binDir);
	print(['count:', count]);
	const initSequence = await makeSequence(count);
	print(initSequence);
	await grabData(initSequence, binDir);
	// print(metadataArr.length);
};

// ----------Init----------//
initialize();
