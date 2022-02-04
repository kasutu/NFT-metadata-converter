#!/usr/bin/env node

// init
const basePath = process.cwd();
import fs from 'fs';
import chalk from 'chalk';


// directories
const binDir = './bin';
const outputDir = './output';

// global variables
const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));
const metadataArr = [];
const finalData = [];

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
	const sequence = [];

	// make an array of numbers 1 to length
	for (let i = 0; i < length; i++) {
		sequence.push(i + 1);
	}
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
		logger(`pushed: [  ${file}  ]`);
	}

	report(`files converted: [ ${metadataArr.length} ]`);
}

async function writeMeta(array) {
	await array.forEach((element) => {
		let meta = {
			file_path: 'pathh',
			nft_name: element.name,
			external_link: element.image,
			description: element.description,
			collection: 'nameee',
			properties: [],
			unlockable_content: false,
			explicit_and_sensitive_content: false,
			supply: 1,
			blockchain: 'Polygon',
			sale_type: 'Fixed Price',
			price: 0.033,
			duration: '6 months',
			specific_buyer: false,
			quantity: 1,
		};

		element.attributes.forEach((element) => {
			meta.properties.push({
				type: element.trait_type,
				name: element.value,
			});
		});

		finalData.push({ nft: [meta] });
	});
}

async function retrieve(array) {
	array.forEach((element) => {
		console.log(element.nft[0].nft_name);
	});
}


// ----------Init----------//
// executes functions in order

const files = await checkFolder(binDir); // checks folder for available files
await pushMeta(files, binDir, metadataArr); // push all data to array
await writeMeta(metadataArr);
await retrieve(finalData);
