const path = require('path');
const fs = require('fs');
const readline = require('readline');

/**
 * 
 * @param {number[]} dataset
 * @param {boolean} isReverse 
 */
function getDifferences(dataset, isReverse) {
	if (dataset.every((data) => data === 0)) return 0

	const tmp = []
	for (let i = 0; i < dataset.length; i++) {
		if (i < dataset.length - 1) tmp.push(dataset[i+1] - dataset[i])
	}

	return isReverse ? tmp[0] - getDifferences(tmp, isReverse) : tmp[tmp.length-1] + getDifferences(tmp)
}

/**
 * 
 * @param {string[]} lines 
 * @param {boolean} isReverse 
 */
function solve(lines, isReverse) {
	let result = 0
	let currDataset
	let extrapolated
	for (const line of lines) {
		currDataset = line.split(' ').map((value) => parseInt(value))
		extrapolated = isReverse ? currDataset[0] - getDifferences(currDataset, isReverse) : 
									currDataset[currDataset.length - 1] + getDifferences(currDataset)
		
		result += extrapolated
	}
	console.log(result)
}

const INPUT_PATH = path.join(__dirname, 'input.txt')
const readStream = fs.createReadStream(INPUT_PATH)
const rl = readline.createInterface({
	input: readStream
})

const lines = []
rl.on('line', (line) => {
	lines.push(line)
})

rl.on('close', () => {
	// solve(lines, false)
	solve(lines, true)
})