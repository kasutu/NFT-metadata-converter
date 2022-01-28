#!/usr/bin/env node

// init
import { readdir, readFile } from 'fs';
import chalk from 'chalk';
// import { meta } from './kasutu_modules/metaTemplates';

// directories
const binDir = './bin';
const outputDir = './output';

// global variables
const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));
let startPace;
const metadataArr = [];

// global functions

function print(log) {
	// logs in console
	console.log('>>', chalk.bgBlue(log));
}

function printErr(error) {
	// error log handler
	console.log('>>', chalk.red(error));
}

function logger(log) {
	// logs in console
	console.log('>>', chalk.bgGreen(log));
}

function report(log) {
	// logs in console
	console.log('>>', log);
}

async function countFiles(dir) {
	// working total file counter
	return new Promise((resolve, reject) =>
		readdir(dir, (err, files) =>
			err ? reject(printErr(err)) : resolve(files.length)
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

async function checkFolder(dir) {
	// check folder for available files

	return new Promise((resolve, reject) =>
		readdir(dir, (err, files) => (err ? reject(printErr(err)) : resolve(files)))
	);
}

async function getData(dir, fileName) {
	// grabs the data inside a json file
	// logger(`grabbing data from: [  ${fileName}  ]`);

	return new Promise((resolve, reject) => {
		// check and save data
		readFile(`${dir}/${fileName}`, 'utf-8', (err, jsonStr) => {
			err ? reject(printErr(err)) : resolve(JSON.parse(jsonStr));
		});
	});
}

async function pushMeta(files, dir, arr) {
	// read each files and push it to an array
	for (const file of files) {
		const meta = await getData(dir, file);
		arr.push(meta);
		logger(`pushing: [  ${file}  ]`);
	}
}

const initialize = async () => {
	// executes functions in order
	print('INITIALIZING...');
	await sleep(); // sleeps for 1.5 sec

	// checks folder for available files
	const files = await checkFolder(binDir);

	// push all data to array
	await pushMeta(files, binDir, metadataArr);

	report(`converted: ${metadataArr.length} files`);
	print('DONE INIT...');
};

// ----------Init----------//
initialize();
