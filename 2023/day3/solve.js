const path = require('path');
const fs = require('fs');
const readline = require('readline');

const INPUT_PATH = path.join(__dirname, 'input.txt')

/**
 * search the 1char 'margin' around the number
 * @param {string[]} lines 
 */
function part1(lines) {
	let result = 0
	const symbolPattern = /[^0-9.]+/ // anything not a number or a dot

	for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
		const numbers = lines[lineIdx].matchAll(/\d+/g)
		for (const n of numbers) {
			const startIdx = n.index
			const endIdx = n.index + n[0].length - 1

			// top
			if (lineIdx > 0 &&
				lines[lineIdx-1].substring(startIdx - 1, endIdx + 2).search(symbolPattern) !== -1) {
				result += parseInt(n[0])
				continue
			}

			// bottom
			if (lineIdx < lines.length - 1 &&
				lines[lineIdx+1].substring(startIdx - 1, endIdx + 2).search(symbolPattern) !== -1) {
				result += parseInt(n[0])
				continue
			}

			// left
			if (n.index > 0 && symbolPattern.test(lines[lineIdx][startIdx-1])) {
				result += parseInt(n[0])
				continue
			}
			
			// right
			if (endIdx < lines[0].length - 1 && symbolPattern.test(lines[lineIdx][endIdx+1])) {
				result += parseInt(n[0])
				continue
			}
		}
	}
	console.log(result)
}

/**
 * search part numbers like p1
 * and store them as reference with the gears
 * @param {string[]} lines 
 */
function part2(lines) {
	let result = 0
	let gears = {}

	for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
		const numbers = lines[lineIdx].matchAll(/\d+/g)
		for (const n of numbers) {
			const startIdx = n.index
			const endIdx = n.index + n[0].length - 1
			// top
			if (lineIdx > 0) {
				const searchStr = lines[lineIdx-1].substring(startIdx - 1, endIdx + 2)
				
				let startSearchIdx = 0
				// search for all occurrences of *
				while ((currIdx = searchStr.indexOf('*', startSearchIdx)) !== -1) {
					// store position of *
					const gearY = lineIdx - 1
					const gearX = currIdx + startIdx - (startIdx === 0 ? 0 : 1)
					const gearId = `${gearY}-${gearX}`
					// store the part number for that *
					if (gearId in gears) {
						gears[gearId].push(n[0])
					} else {
						gears[gearId] = [n[0]]
					}
					startSearchIdx += currIdx + 1
				}
			}

			// bottom
			if (lineIdx < lines.length - 1) {
				const searchStr = lines[lineIdx+1].substring(startIdx - 1, endIdx + 2)
				
				let startSearchIdx = 0
				while ((currIdx = searchStr.indexOf('*', startSearchIdx)) !== -1) {
					const gearY = lineIdx + 1
					const gearX = currIdx + startIdx - (startIdx === 0 ? 0 : 1)
					const gearId = `${gearY}-${gearX}`
					if (gearId in gears) {
						gears[gearId].push(n[0])
					} else {
						gears[gearId] = [n[0]]
					}
					startSearchIdx += currIdx + 1
				}
			}

			// left
			if (n.index > 0) {
				if (lines[lineIdx][startIdx - 1] === '*') {
					const gearY = lineIdx
					const gearX = startIdx - 1
					const gearId = `${gearY}-${gearX}`
					if (gearId in gears) {
						gears[gearId].push(n[0])
					} else {
						gears[gearId] = [n[0]]
					}
				}
			}
			
			// right
			if (endIdx < lines[0].length - 1) {
				if (lines[lineIdx][endIdx + 1] === '*') {
					const gearY = lineIdx
					const gearX = endIdx + 1
					const gearId = `${gearY}-${gearX}`
					if (gearId in gears) {
						gears[gearId].push(n[0])
					} else {
						gears[gearId] = [n[0]]
					}
				}
			}
		}
	}
	
	for (const gearId of Object.keys(gears)) {
		if (gears[gearId].length === 2) {
			result += parseInt(gears[gearId][0]) * parseInt(gears[gearId][1])
		}
	}
	console.log(result)
}

const fileStream = fs.createReadStream(INPUT_PATH)
const rl = readline.createInterface({
	input: fileStream
})

let result = []
rl.on('line', (line) => {
	result.push(line)
})

rl.on('close', () => {
	part1(result)
	part2(result)
})