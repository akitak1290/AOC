const { readFileSync } = require('fs')
const { resolve } = require('path')

// assume str1 and str2 have the same length
// and are both string
function compareString(str1, str2, len) {
	let dif = 0
	for (let i = 0; i < len; i++) {
		if (str1[i] !== str2[i]) dif += 1
	}
	return dif
}

/**
 * 
 * @param {string[]} block 
 * @param {number} smudgeCount
 * @param {number | undefined} exclude
 * @returns {number | null}
 */
function countRow(block, smudgeCount) {
	let rowIdx = 0
	while (rowIdx < block.length - 1) {
		let dif = compareString(block[rowIdx], block[rowIdx + 1])
		// TODO: prob won't need this if and merge it with while
		if (dif === 0 || dif === 1) {
			let offset = 0
			let fullMatch = true
			// search outward
			while (rowIdx - offset >= 0 && rowIdx + offset + 1 <= block.length - 1) {
				dif = compareString(block[rowIdx - offset], block[rowIdx + offset + 1], block[0].length)
				if (dif > 0) {
					if (dif === 1 && smudgeCount > 0) {
						smudgeCount -= 1
					} else {
						fullMatch = false
						break
					}
				}
				offset += 1
			}
			if (fullMatch && smudgeCount === 0) {
				return rowIdx + 1
			}
		}
		rowIdx += 1
	}
	return null
}

/**
 * 
 * @param {string[]} block 
 * @param {number} smudgeCount
 * @returns {number[]}
 */
function countTerrain(block, smudgeCount) {
	// count column
	// TODO: refac this?
	let tmp = []
	for (let i = 0; i < block[0].length; i++) {
		let line = ''
		for (let j = block.length-1; j >= 0; j--) {
			line += block[j][i]
		}
		tmp.push(line)
	}
	const col = countRow(tmp, smudgeCount)
	// count row
	const row = countRow(block, smudgeCount)

	return row*100 + col
}

const input = readFileSync(resolve('./input.txt'), { encoding: 'utf-8' })
const lines = input.split('\n')

const blocks = []
let block = []
let idx = 0
while (idx < lines.length){
	if (lines[idx] !== '') {
		block.push(lines[idx])
		if (idx === lines.length - 1 || lines[idx+1] === '') {
			blocks.push(block)
			block = []
		}
	}
	idx += 1
}

let resultP1 = 0
let resultP2 = 0
for (const block of blocks) {
	// the parsing thing to add 1 is an eyesore...
	// TODO: update logic?
	resultP1 += countTerrain(block, 0)
	resultP2 += countTerrain(block, 1)
}

console.log(resultP1, resultP2)
