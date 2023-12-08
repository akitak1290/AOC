const path = require('path');
const fs = require('fs');
const readline = require('readline');

/**
 * 
 * @param {string} directions
 * @param {Object.<string, string[]>} nodes 
 */
function part1(directions, nodes) {
	let result = 0
	let currNode = 'AAA'
	const endNode = 'ZZZ'
	while (true) {
		for (const direction of directions) {
			currNode = nodes[currNode][direction === 'L' ? 0 : 1]

			result += 1

			if (currNode === endNode) {
				console.log(result)
				return
			}
		}
	}
}

// /**
//  * 
//  * @param {string} directions 
//  * @param {Object.<string, string[]>} nodes 
//  */
function part2(directions, nodes) {
	// manually examining the input, for each path,
	// the length from start to end and end to next end
	// is the same
	// each time a path reaches the end, it will take 
	// the same number of steps to reach that end again.
	// assuming the input will yield an answer, that means that
	// at some point those loops (path) will have to meet
	// -> problem become finding LCM between the paths' lengths
	// ! NOTE1: gave up brute forcing, has to reddit AOC...
	// ! NOTE2: answer is in the trillion and brute force will take forever
	const currNodes = Object.keys(nodes).filter((word) => /A$/.test(word))
	const currNodesCnt = new Array(currNodes.length).fill(0)

	while (true) {
		for (const direction of directions) {
			let isTerminal = true

			for (let i = 0; i < currNodes.length; i++) {
				if (!/Z$/.test(currNodes[i])) {
					currNodes[i] = nodes[currNodes[i]][direction === 'L' ? 0 : 1]
					currNodesCnt[i] += 1
					isTerminal = false
				} else {
					isTerminal = true && isTerminal
				}
			}

			if (isTerminal) {
				// brute-force LCM
				// takes ~ bil' tries

				// Euclidean Algorithm
				const gcd = (a, b) => a ? gcd(b % a, a) : b;
				const lcm = (a, b) => a * b / gcd(a, b);

				const result = currNodesCnt.reduce(lcm);
				console.log(result)

				return
			}
		}
	}
}

const INPUT_PATH = path.join(__dirname, 'input.txt')
const readStream = fs.createReadStream(INPUT_PATH)
const rl = readline.createInterface({
	input: readStream
})

let directions
const nodes = {}
let idx = 0
rl.on('line', (line) => {
	if (idx === 0) directions = line

	if (idx > 1) {
		nodes[line.substring(0, 3)] = [line.substring(7, 10), line.substring(12, 15)]
	}
	idx += 1
})

rl.on('close', () => {
	part1(directions, nodes)
	part2(directions, nodes)
})

