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
function countRow(block, smudgeCount, exclude) {
	let rowIdx = 0
	while (rowIdx < block.length - 1) {
		let dif = compareString(block[rowIdx], block[rowIdx + 1])
		let smudges = smudgeCount
		// TODO: prob won't need this if and merge it with while
		if (dif === 0 || dif === 1) {
			let offset = 0
			let fullMatch = true
			// search outward
			while (offset <= Math.min(rowIdx, block.length - rowIdx - 2)) {
				dif = compareString(block[rowIdx - offset], block[rowIdx + offset + 1], block[0].length)
				if (dif > 0) {
					if (dif === 1 && smudges > 0) {
						smudges -= 1
					} else {
						fullMatch = false
						break
					}
				}
				offset += 1
			}
			// AHA!, forgot to exclude result from p1 because
			// after fixing the smudge, the first result for part 2
			// can be the same as part 1, which is against the rule for part 2
			if (fullMatch && smudges === 0) {
				if ((!exclude) || (exclude && exclude !== rowIdx)) {
					return rowIdx
				}
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
 * @param {number | undefined} excludeRow
 * @param {number | undefined} excludeCol
 * @returns {number[]}
 */
function countTerrain(block, smudgeCount, excludeRow, excludeCol) {
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
	const col = countRow(tmp, smudgeCount, excludeCol)
	// count row
	const row = countRow(block, smudgeCount, excludeRow)

	return [row, col]
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
	const [rowF, colF] = countTerrain(block, 0)
	resultP1 += (rowF === null ? 0 : rowF+1)*100 + (colF === null ? 0 : colF+1)
	const [rowS, colS] = countTerrain(block, 1, rowF, colF)
	resultP2 += (rowS === null ? 0 : rowS+1)*100 + (colS === null ? 0 : colS+1)
}

console.log(resultP1, resultP2)
