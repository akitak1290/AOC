const path = require('path');
const fs = require('fs');
const readline = require('readline');

const INPUT_PATH = path.join(__dirname, 'input.txt')

/**
 * Ugliest solve ever, now and forever!!!
 * @param {string[]} lines 
 */
function part1(lines) {
	let result = 0
	const colorSets = {
		'red': 12,
		'green': 13,
		'blue': 14
	}
	const colors = Object.keys(colorSets)
	for (const line of lines) {
		let validCombo = true
		for (const set of line.split(':')[1].split(';')) {
			for (const coloredCubeCnt of set.split(',')){
				const tmp = coloredCubeCnt.split(' ')
				if (parseInt(tmp[1]) > colorSets[tmp[2]]) {
					validCombo = false
					break
				}
			}
			if (!validCombo) {
				break
			}
		}
		if (validCombo){
			result += parseInt(line.split(':')[0].substring(5))
		}
	}
	console.log(result)
}

/**
 * find max
 * @param {string[]} lines 
 */
function part2(lines) {
	let result = 0
	for (const line of lines) {
		const colorSetMax = {
			red: 0,
			blue: 0,
			green: 0
		}
		for (const set of line.split(':')[1].split(';')) {
			for (const coloredCubeCnt of set.split(',')) {
				const tmp = coloredCubeCnt.split(' ')
				const cubeCnt = parseInt(tmp[1])
				if (cubeCnt > colorSetMax[tmp[2]]) {
					colorSetMax[tmp[2]] = cubeCnt
				}
			}
		}
		const power = Object.values(colorSetMax).reduce((accumulator, cnt) => {
			return accumulator*cnt
		}, 1)
		result += power
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
	// do st with result
	// part1(result)
	part2(result)
})