const { readFileSync } = require('node:fs')

// 1. scale the graph x3 so fill can work with paths
// from outside to in with not actual gap, but there are paths
// 2. follow the loop to count its length, asw for p1 is length/2
// 3. fill the whole graph, after that, count the 'actual cell'
// (which are not 'scaled cells') that has not been filled
// asw for p2

function scaleUp(lines) {
	const newLines = []
	for (const line of lines) {
		const scaledLine = [[], [], []]
		for (const char of line) {
			const scaledChar = Array.from(new Array(3), () => new Array(3).fill('.'))
			if (char === '|') {
				scaledChar[0][1] = '|'
				scaledChar[1][1] = '|'
				scaledChar[2][1] = '|'
			} else if (char === '-') {
				scaledChar[1][0] = '-'
				scaledChar[1][1] = '-'
				scaledChar[1][2] = '-'
			} else if (char === 'L') {
				scaledChar[0][1] = '|'
				scaledChar[1][1] = 'L'
				scaledChar[1][2] = '-'
			} else if (char === 'J') {
				scaledChar[0][1] = '|'
				scaledChar[1][1] = 'J'
				scaledChar[1][0] = '-'
			} else if (char === '7') {
				scaledChar[1][0] = '-'
				scaledChar[1][1] = '7'
				scaledChar[2][1] = '|'
			} else if (char === 'F') {
				scaledChar[1][2] = '-'
				scaledChar[1][1] = 'F'
				scaledChar[2][1] = '|'
			}
			scaledLine[0].push(...scaledChar[0])
			scaledLine[1].push(...scaledChar[1])
			scaledLine[2].push(...scaledChar[2])
		}
		for (const sLine of scaledLine) {
			newLines.push(sLine)
		}
	}
	return newLines.map((line) => line.join(''))
}

function fill(x, y, visited) {
	const queue = []

	queue.push([x, y])
	visited[y][x] = true
	while (queue.length > 0) {
		const cur = queue.shift()
		x = cur[0]
		y = cur[1]

		// left
		if (x > 0 && !visited[y][x - 1]) {
			visited[y][x - 1] = true
			queue.push([x - 1, y])
		}
		// right
		if (x < visited[0].length - 1 && !visited[y][x + 1]) {
			visited[y][x + 1] = true
			queue.push([x + 1, y])
		}
		// top
		if (y > 0 && !visited[y - 1][x]) {
			visited[y - 1][x] = true
			queue.push([x, y - 1])
		}
		// bottom
		if (y < visited.length - 1 && !visited[y + 1][x]) {
			visited[y + 1][x] = true
			queue.push([x, y + 1])
		}
	}
}

function solve(lines, x, y) {
	const visited = Array.from(new Array(lines.length), () => new Array(lines[0].length).fill(false))
	visited[y][x] = true

	let cnt = 1
	while (true) {
		const c = lines[y][x]
		const up = c === '|' || c === 'L' || c === 'J'
		const down = c === '|' || c === 'F' || c === '7'
		const left = c === '-' || c === 'J' || c === '7'
		const right = c === '-' || c === 'L' || c === 'F'

		if (up && !visited[y - 1][x]) {
			y -= 1
			visited[y][x] = true
			cnt += 1
			continue
		}

		if (down && !visited[y + 1][x]) {
			y += 1
			visited[y][x] = true
			cnt += 1
			continue
		}

		if (left && !visited[y][x - 1]) {
			x -= 1
			visited[y][x] = true
			cnt += 1
			continue
		}

		if (right && !visited[y][x + 1]) {
			x += 1
			visited[y][x] = true
			cnt += 1
			continue
		}
		break
	}

	console.log(`Path to farthest cell: ${cnt / 2 / 3}`)

	// fill
	fill(0, 0, visited)

	// TO VISUALIZE THE GRAPH AFTER FILLED
	// for (const [i, line] of visited.entries()) {
	// 	for (let j = 0; j < line.length; j += 1) {
	// 		if (visited[i][j]) {
	// 			// notFilled += 1
	// 			visited[i][j] = '#'
	// 		} else {
	// 			visited[i][j] = '.'
	// 		}
	// 	}
	// }
	// console.log(visited.map(line => line.join('')))

	let tmpArr = []
	let ans = 0
	// scale down and count the 'real' cell
	for (let i = 0; i < lines.length; i += 3) {
		let tmpLine = []
		for (let j = 0; j < lines[i].length; j += 3) {
			tmpLine.push(visited[i+1][j+1])
			if (!visited[i+1][j+1]) ans += 1
		}
		tmpArr.push(tmpLine)
	}
	// console.log(tmpArr.map(x => x.join('')))
	console.log(ans)
}

const inputText = readFileSync('./input.txt', { encoding: 'utf-8' })
const lines = inputText.split('\n')

// hardcoded for my input
let start = []
for (const [i, line] of lines.entries()) {
	if (line.search('S') !== -1) {
		start.push(line.search('S'), i)
		lines[i] = lines[i].replace('S', '7')
	}
}

const scaledLines = scaleUp(lines)
solve(scaledLines, start[0] * 3 + 1, start[1] * 3 + 1)

