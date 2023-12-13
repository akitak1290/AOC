// trying to read files using fs from now on
const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

/**
 * Brute force search for all permutations.
 * 
 * Replace each ? with either # or .
 * until there are no more ?. Check if 
 * final string matches regex
 * @param {string} str input string
 * @param {RegExp} regex solution pattern
 * @param {Object} store 
 * @returns {number} total permutations count
 */
function checkPermutations(str, regex, store) {
	if (str.search(/\?/) === -1) return regex.test(str) ? 1 : 0

	return checkPermutations(str.replace('?', '.'), regex) + checkPermutations(str.replace('?', '#'), regex)
}

/**
 * @param {boolean} isDup false for part 1, true for part 2 
 * @returns
 */
async function solve(isDup) {
	let result = 0
	let lines
	try {
		const contents = await readFile(resolve('./input.txt'), { encoding: 'utf8' });
		lines = contents.split(/\n/)
	} catch (err) { 
		console.error(err.message)
		return
	}
	
	// brute force approach
	for (const line of lines) {
		// parse result format using the number array
		const lineParse = line.split(' ')
		let springConditions = lineParse[0]
		let groupsCount = lineParse[1]

		if (isDup) {
			// Array(4).fill(null).forEach((_) => springConditions += '?'+lineParse[0])
			// Array(4).fill(null).forEach((_) => groupsCount += ','+lineParse[1])
		}

		const regexStr = groupsCount.split(',').reduce(
			(acc, curVal, curIdx, arr) =>
				curIdx === arr.length - 1 ? acc + `#{${curVal}}\\.*$` : acc + `#{${curVal}}\\.+`
			, '^\\.*');
		result += checkPermutations(springConditions, new RegExp(regexStr), {})
	}

	console.log(result)
}

function test(str) {
	const regexStr = str.split(' ')[1].split(',').reduce(
		(acc, curVal, curIdx, arr) =>
			curIdx === arr.length - 1 ? acc + `#{${curVal}}\\.*$` : acc + `#{${curVal}}\\.+`
		, '^\\.*');
	const regex = new RegExp(regexStr)
	return regex.test(str.split(' ')[0])
}

solve(false)
solve(true)