const { readFileSync } = require('node:fs')
const { transpose } = require('../utils')

function countLoad(lines) {
	// per col, get cube-shaped rocks pos
	// in between cube-shaped rocks (assume
	// theres a row at the top of the input)
	// count how many rounded rocks
	// cal the load based on the max pos
	// of the first cube-shaped rocks and
	// the count of rounded rocks

	const newLines = transpose(lines)
	let result = 0
	for (const line of newLines) {
		let charIdx = 0
		let curMaxLoad = lines.length - Math.min(line.search('O'), line.search('.'))
		while (charIdx < line.length) {
			if (line[charIdx] === 'O') {
				result += curMaxLoad
				curMaxLoad -= 1
			}
			if (line[charIdx] === '#') {
				curMaxLoad = lines.length - charIdx - 1
			}
			charIdx += 1
		}
	}
	console.log(result)
}

const inputText = readFileSync('./input.txt', { encoding: 'utf-8' })
const lines = inputText.split('\n')

countLoad(lines)
