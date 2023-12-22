const { readFileSync } = require('node:fs')

function vSlice(lines, col) {
	const sliced = []
	for (let i = 0; i < lines.length; i += 1) {
		sliced.push(lines[i][col])
	}
	return sliced
}

function solve(lines, scale) {
	let galaxies = []
	for (let i = 0; i < lines.length; i += 1) {
		for (let j = 0; j < lines[0].length; j += 1) {
			if (lines[i][j] === "#") galaxies.push([i, j])
		}
	}

	let ans = 0
	for (let i = 0; i < galaxies.length; i += 1) {
		for (let j = i + 1; j < galaxies.length; j += 1) {
			const start = galaxies[i]
			const dest = galaxies[j]

			// count row - 1
			// count col, but if both are on the same row, col -1

			let rowCnt = 0
			for (let row = Math.min(start[0], dest[0]) + 1; row < Math.max(start[0], dest[0]); row += 1) {
				rowCnt += lines[row].search('#') === -1 ? scale : 1
			}

			let colCnt = 0
			for (let col = Math.min(start[1], dest[1]); col <= Math.max(start[1], dest[1]); col += 1) {
				colCnt += vSlice(lines, col).every((cur) => cur === '.') ? scale : 1
			}

			if (start[0] == dest[0]) colCnt -= 1

			ans += rowCnt + colCnt
		}
	}
	console.log(ans)
}

const inputText = readFileSync('./input.txt', { encoding: 'utf-8' })
const lines = inputText.split('\n')

// this took 4s for p1...
// TODO: optimize a bit?
solve(lines, 1000000) 