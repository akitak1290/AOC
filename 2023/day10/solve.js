const { readFileSync } = require('node:fs')

function getDirection(speed, char) {
	let newSpeed
	if (speed[0] == 1) {
		// right
		if (char == "-") newSpeed = [1, 0]
		if (char == "J") newSpeed = [0, -1]
		if (char == "7") newSpeed = [0, 1]
	}
	else if (speed[0] == -1) {
		// left
		if (char == "-") newSpeed = [-1, 0]
		if (char == "L") newSpeed = [0, -1]
		if (char == "F") newSpeed = [0, 1]
	}
	else if (speed[1] == 1) {
		// bottom
		if (char == "|") newSpeed = [0, 1]
		if (char == "L") newSpeed = [1, 0]
		if (char == "J") newSpeed = [-1, 0]
	} else if (speed[1] == -1) {
		// top
		if (char == "|") newSpeed = [0, -1]
		if (char == "F") newSpeed = [1, 0]
		if (char == "7") newSpeed = [-1, 0]
	}

	if (!newSpeed) throw new Error('char is not valid');

	return newSpeed
}

// prob can refactor this
function solve(lines, start, pos1, pos2, speed1, speed2) {
	let visited = new Set()

	visited.add(JSON.stringify(start))
	visited.add(JSON.stringify(pos1))
	visited.add(JSON.stringify(pos2))

	while (JSON.stringify(pos1) != JSON.stringify(pos2)) {
		// update pos
		pos1 = pos1.map((v, i) => v+speed1[i])
		pos2 = pos2.map((v, i) => v+speed2[i])

		// update set
		visited.add(JSON.stringify(pos1))
		visited.add(JSON.stringify(pos2))

		// update speed
		speed1 = getDirection(speed1, lines[pos1[1]][pos1[0]])
		speed2 = getDirection(speed2, lines[pos2[1]][pos2[0]])
	}
	console.log(`Steps to farthest point: ${visited.size / 2}`)

}

const inputText = readFileSync('./input.txt', { encoding: 'utf-8' })
const lines = inputText.split('\n')

// hardcode this because it's just 2 cases...
solve(lines, [25, 42], [24, 42], [25, 43], [0, -1], [1, 0])
