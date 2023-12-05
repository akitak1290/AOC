const fs = require('fs');
const path = require('path');
const readline = require('readline');

const INPUT_PATH = path.resolve(__dirname, 'input.txt')

/**
 * 2 pointers solve
 * @param {string[]} lines 
 */
function part1(lines) {
	let result = 0
	for (const line of lines) {
		const len = line.length
		let l = 0
		let r = len - 1

		// use isNaN because of type coercion
		while (isNaN(line[l]) && l < len) l++
		while (isNaN(line[r]) && r >= 0) r--

		if (l === len) continue

		result += parseInt(line[l] + line[r])
	}
	console.log(result)
}

/**
 * sliding window solve
 * @param {string[]} lines 
 */
function part2(lines) {
	let result = 0
	const digits = {
		"one": "1",
		"two": "2",
		"three": "3",
		"four": "4",
		"five": "5",
		"six": "6",
		"seven": "7",
		"eight": "8",
		"nine": "9"
	}
	const spelledDigits = Object.keys(digits)
	for (const line of lines) {
		let parseLine = line
		// replace spelled digits with their numeric counterpart
		for (const d of spelledDigits) {
			// duplicate the first and last characters incase there are
			// word overlaps, if not then it won't affect the result
			parseLine = parseLine.replaceAll(d, d[0]+digits[d]+d[d.length-1])
		}

		const len = parseLine.length
		let l = 0
		let r = len - 1

		// use isNaN because of type coercion
		while (isNaN(parseLine[l]) && l < len) l++
		while (isNaN(parseLine[r]) && r >= 0) r--

		if (l === len) continue

		result += parseInt(parseLine[l] + parseLine[r])
	}
	console.log(result)
}

const fileStream = fs.createReadStream(INPUT_PATH)
const rl = readline.createInterface({
	input: fileStream,
	crlfDelay: Infinity
})

let result = []
rl.on('line', (line) => {
	result.push(line)
});

rl.on('close', () => {
	part1(result)
	part2(result)
})