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

function countTerrain(block) {
	// count row
	const rows = countRow(block)*100
	// count column
	let tmp = []
	for (let i = 0; i < block[0].length; i++) {
		let line = ''
		for (let j = block.length-1; j >= 0; j--) {
			line += block[j][i]
		}
		tmp.push(line)
	}
	const cols = countRow(tmp)

	return rows + cols
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