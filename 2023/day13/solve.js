const { readFileSync } = require('fs')
const { resolve } = require('path')

function countRow(block) {
	let rowIdx = 0
	while (rowIdx < block.length - 1) {
		if (block[rowIdx] === block[rowIdx + 1]) {
			let offset = 0
			let fullMatch = true
			// search outward
			while (offset <= Math.min(rowIdx, block.length - rowIdx - 2)) {
				fullMatch = fullMatch && block[rowIdx - offset] === block[rowIdx + offset + 1]
				offset += 1
			}
			if (fullMatch) return rowIdx + 1
		}
		rowIdx += 1
	}

	return 0
}

function countColumn(block) {
	let colIdx = 0

	// check each pair of character in the first row
	while (colIdx < block[0].length - 1) {
		// if pair matches
		if (block[0][colIdx] === block[0][colIdx + 1]) {
			let offset = 0
			let match = true
			
			// search outwards until either bounds
			while (colIdx - offset >= 0 && colIdx + offset + 1 < block[0].length) {
				let rowIdx = 0
				// check pair in the next rows
				while (rowIdx < block.length) {
					if (block[rowIdx][colIdx - offset] !== block[rowIdx][colIdx + offset + 1]) {
						match = false
						break
					}
					rowIdx += 1
				}
				offset += 1
			}
			if (match) return colIdx + 1
		}
		colIdx += 1
	}

	return 0
}

function countTerrain(block) {
	return countRow(block)*100 + countColumn(block)
}

const input = readFileSync(resolve('./input.txt'), { encoding: 'utf-8' })
const lines = input.split('\n')

let block = []
let result = 0
for (const [idx, line] of lines.entries()) {
	if (line === '') {
		result += countTerrain(block)
		block = []
		continue
	}

	if (idx === lines.length - 1) {
		block.push(line)
		result += countTerrain(block)
	}

	block.push(line)
}

console.log(result)