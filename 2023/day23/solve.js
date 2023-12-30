const { readFileSync } = require('node:fs')

const SLOPES = new Set(['^', '>', 'v', '<'])

function getNeighbors(map, cur) {
	const [x, y] = cur
	const N = []

	if (y > 0) N.push([x, y - 1])
	if (y < map.length - 1) N.push([x, y + 1])
	if (x > 0) N.push([x + 1, y])
	if (x < map[0].length - 1) N.push([x - 1, y])

	return N
}

function canMoveSlope(v, cell) {
	const [v_x, v_y] = v

	if (v_x == 1 && cell == '>') return true
	if (v_x == -1 && cell == '<') return true
	if (v_y == 1 && cell == 'v') return true
	if (v_y == -1 && cell == '^') return true

	return false
}

function move(map, visited, cur, dest, counts, cntIdx) {
	visited.add(`${cur[0]},${cur[1]}`)

	// search until dest
	while (`${cur[0]},${cur[1]}` != `${dest[0]},${dest[1]}`) {
		const N = getNeighbors(map, cur)

		let moved = false
		for (const n of N) {
			const [x, y] = n
			// const v = [x - cur[0], y - cur[1]]

			// check slope
			// if (SLOPES.has(map[y][x]) && !canMoveSlope(v, map[y][x])) continue

			// move
			if (!visited.has(`${x},${y}`) && map[y][x] != '#') {
				if (moved) {
					counts.push(counts[cntIdx])
					move(map, new Set(visited), n.slice(), dest, counts, counts.length - 1)
				} else {
					moved = true
					cur = n.slice()
					counts[cntIdx] += 1
					visited.add(`${cur[0]},${cur[1]}`)
				}
			}
		}

		if (!moved) {
			counts[cntIdx] = 0
			return
		}
	}

}

function solve(map, start, dest) {
	const counts = [0]
	const visited = new Set()

	// move doesn't check for bounds
	// so if there's another exit, it
	// will run forever, dk why yet
	move(map, visited, start, dest, counts, 0)
	console.log(Math.max(...counts))
}

const textInput = readFileSync('./input.txt', { encoding: 'utf-8' })
const map = textInput.split('\n')

// solve(map, [1, 0], [map[0].length - 2, map.length - 1])