// trying to read files using fs from now on
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

// alternative to using regex, keep slicing the array
// based on counts and other rules
// https://gist.github.com/akitak1290/52b0a98a4e6f0f13437c9e17f35828d4
// based on
// https://gist.github.com/Nathan-Fenner/781285b77244f06cf3248a04869e7161

/**
 * 
 * @param {string} line
 * @param {number[]} counts
 * @returns 
 */
function cntPermutations(line, counts) {
	// no more spring to check, not a valid perm
	// if line doesn't match counts
	if (line.length === 0) return counts.length === 0 ? 1 : 0

	if (counts.length === 0) {
		// not a valid perm if line doesn't match counts
		for (let i = 0; i < line.length; i++) {
			if (line[i] === "#") return 0
		}
		return 1
	}

	// not enough room for all counts
	if (line.length < counts.reduce((acc, cur) => acc + cur) + counts.length - 1) return 0

	// remove good spring as we don't care about those
	if (line[0] === '.') return cntPermutations(line.slice(1), counts)
	
	// check if there are enough wildcard for current count 
	// or there are enough '#', else it's not a valid perm 
	if (line[0] === "#") {
		const [count, ...restOfCounts] = counts
		for (let i = 0; i < count; i++) {
			if (line[i] === ".") return 0
		}
		// case where current streak of broken spring are more
		// than count
		if (line[count] === "#") return 0

		return cntPermutations(line.slice(count + 1), restOfCounts)
	}

	// still check both ways
	return (
		cntPermutations("#" + line.slice(1), counts) + cntPermutations("." + line.slice(1), counts)
	)
}

const contents = readFileSync(resolve('./input.txt'), { encoding: 'utf8' });
const lines = contents.split(/\n/)

let result = 0
x = 0
for (const line of lines) {
	const [inputStr, countsStr] = line.split(" ")
	const counts = countsStr.split(',').map((value) => parseInt(value))

	// part 2
	const inputStrP2 = Array(5).fill(inputStr).join('?')
	const countsP2 = [...counts, ...counts, ...counts, ...counts, ...counts]

	result += cntPermutations(inputStrP2, countsP2)
	x += 1
	console.log(x, result)
}

console.log(result)