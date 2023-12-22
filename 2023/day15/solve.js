const { readFileSync } = require('node:fs')

function hash(str) {
	let cur = 0
	for (let i = 0; i < str.length; i += 1) {
		cur += str.charCodeAt(i)
		cur *= 17
		cur %= 256
	}
	return cur
}

/**
 * 
 * @param {string} input 
 */
function solve(input) {
	const boxes = Array.from(new Array(256), () => new Array())
	
	for (const str of input) {
		const splitIdx = str.search(/[-=]/)
		const operator = str[splitIdx]
		const label = str.slice(0, splitIdx)
		const focalLength = str.slice(splitIdx + 1)
		const boxIdx = hash(label)
		
		let foundIdx = -1
		for (let i = 0; i < boxes[boxIdx].length; i += 1) {
			if (boxes[boxIdx][i][0] === label) foundIdx = i
		}

		if (foundIdx !== -1 && operator === '-') {
			boxes[boxIdx].splice(foundIdx, 1)
		}
		if (foundIdx === -1 && operator === '=') {
			boxes[boxIdx].push([label, focalLength])
		}
		if (foundIdx !== -1 && operator === '=') {
			boxes[boxIdx][foundIdx][1] = focalLength
		}

		// console.log(`after ${label}${operator}${focalLength}:`)
		// for (const box of boxes) {
		// 	if (box.length != 0) console.log(box)
		// }
	}

	let sum = 0
	for (const [boxIdx, box] of boxes.entries()) {
		if (box.length != 0) {
			for (const [lensIdx, lensSlot] of box.entries()) {
				let power = (1 + boxIdx) * (1 + lensIdx) * parseInt(lensSlot[1])
				sum += power
			}
		}
	}

	console.log(sum)
}

let fileInput = readFileSync('./input.txt', { encoding: 'utf-8' })
if (fileInput[fileInput.length - 1] === '\n') fileInput = fileInput.slice(0, fileInput.length - 1)
const input = fileInput.split(',')

solve(input)