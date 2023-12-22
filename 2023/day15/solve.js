const { readFileSync } = require('node:fs')

/**
 * 
 * @param {string} input 
 */
function solve(input) {
	let sum = 0
	for (const str of input) {
		let cur = 0
		for (let i = 0; i < str.length; i += 1) {
			cur += str.charCodeAt(i)
			cur *= 17
			cur %= 256
		}
		sum += cur
	}
	console.log(sum)
}

let fileInput = readFileSync('./input.txt', { encoding: 'utf-8' })
if (fileInput[fileInput.length - 1] === '\n') fileInput = fileInput.slice(0, fileInput.length - 1)
const input = fileInput.split(',')

solve(input)