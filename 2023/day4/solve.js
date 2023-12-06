const path = require('path');
const fs = require('fs');
const readline = require('readline');

const INPUT_PATH = path.join(__dirname, 'input.txt')

/**
 * search array for winning numbers
 * @param {string[]} lines 
 */
function part1(lines) {
	let result = 0
	for (const line of lines) {
		const searchStr = line.split(":")[1].split("|")
		const winningNumbers = searchStr[0].trim().split(/\s+/)
		const availableNumbers = searchStr[1].trim().split(/\s+/)
		
		let matchCnt = 0
		for (const winningNumber of winningNumbers){
			for (const availableNumber of availableNumbers) {
				if (availableNumber === winningNumber) {
					matchCnt += 1
					break
				}
			}
		}
		result += matchCnt ? 2**(matchCnt-1) : matchCnt
	}
	console.log(result)
}

/**
 * search array for winning numbers
 * and count next cards
 * @param {string[]} lines 
 */
function part2(lines) {
	let result = 0
	let cardCnt = new Array(lines.length).fill(1)
	for (let i = 0; i < lines.length; i++) {
		const searchStr = lines[i].split(":")[1].split("|")
		const winningNumbers = searchStr[0].trim().split(/\s+/)
		const availableNumbers = searchStr[1].trim().split(/\s+/)
		
		let matchCnt = 0
		for (const winningNumber of winningNumbers){
			for (const availableNumber of availableNumbers) {
				if (availableNumber === winningNumber) {
					matchCnt += 1
					break
				}
			}
		}
		
		for (let j = 0; j < cardCnt[i]; j++) {
			for (let k = 0; k < matchCnt; k++) {
				cardCnt[i+k+1] += 1
			}
		}
	}
	result = cardCnt.reduce((accumulator, currentValue) => accumulator += currentValue, 0)
	console.log(result)
}

const readStream = fs.createReadStream(INPUT_PATH)
const rl = readline.createInterface({
	input: readStream
})

const result = []
rl.on('line', (line) => {
	result.push(line)
})

rl.on('close', (line) => {
	part1(result)
	part2(result)
})