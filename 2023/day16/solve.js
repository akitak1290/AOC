const { readFileSync } = require('node:fs')

function isInBound(pos, matrix) {
	const isVBound = pos[0] >= 0 && pos[0] < matrix[0].length
	const isHBound = pos[1] >= 0 && pos[1] < matrix.length
	return isVBound && isHBound
}

function isCycle(map, pos, speed) {
	if (!map.has(`${pos}`)) return false
	return (
		JSON.stringify(map.get(`${pos}`)) === JSON.stringify(speed)
	)
}

function traceLight(matrix, lightMap, pos, speed, beamMap) {
	
	do {
		beamMap.set(`${pos}`, [...speed])
		lightMap[pos[1]][pos[0]] = '#'

		// console.log(lightMap.map(arr => arr.join('')))
		// asd = [...matrix.map(arr => arr.slice())]
		// asd[pos[1]][pos[0]] = '@' 
		// console.log(asd.map(arr => arr.join('')))

		let cell = matrix[pos[1]][pos[0]]
		// I mean...., guess this works?...
		// TODO: refactor?
		switch (cell) {
			case '.':
				// pass
				break;
			case '/':
				if (speed[0] == 1) speed = [0, -1]
				else if (speed[0] == -1) speed = [0, 1]
				else if (speed[1] == 1) speed = [-1, 0]
				else if (speed[1] == -1) speed = [1, 0]
				break;
			case `\\`:
				if (speed[0] == 1) speed = [0, 1]
				else if (speed[0] == -1) speed = [0, -1]
				else if (speed[1] == 1) speed = [1, 0]
				else if (speed[1] == -1) speed = [-1, 0]
				break;
			case '-':
				if (speed[1] != 0) {
					// split
					speed = [1, 0]
					traceLight(matrix, lightMap, pos, [-1, 0], beamMap)
				}
				break;
			case '|':
				if (speed[0] != 0) {
					// split
					speed = [0, 1]
					traceLight(matrix, lightMap, pos, [0, -1], beamMap)
				}
				break;
			default:
				break;
		}
		pos = [pos[0] + speed[0], pos[1] + speed[1]]
	} while(isInBound(pos, matrix) && !isCycle(beamMap, pos, speed))
	// check for bound and for repeating cycles
}

const inputText = readFileSync('./input.txt', {encoding: 'utf-8'})
const lines = inputText.split('\n')

const matrix = lines.map((line) => line.split(''))
const lightMap = new Array(matrix.length).fill(null).map(_ => new Array(matrix[0].length).fill('.'))
const beamMap = new Map()
let startPos = [0, 0]
let startSpeed = [1, 0]

traceLight(matrix, lightMap, startPos, startSpeed, beamMap)
// console.log(lightMap.map((arr) => arr.join('')))
let result = 0
for (const line of lightMap) {
	for (const char of line) {
		if (char == '#') result += 1
	}
}
console.log(result)