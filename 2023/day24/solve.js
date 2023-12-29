const { readFileSync } = require('node:fs')

// used to be okay at math...

function calLine(p1, p2) {
	const [x1, y1] = p1
	const [x2, y2] = p2

	// horizontal line
	if (y2 == y1) return [0, y1 - m * x1]

	// vertical line
	if (x2 == x1) return [null, x1]

	const m = (y2 - y1) / (x2 - x1)
	const b = y1 - m * x1
	return [m, b]
}

function intersect(p1, p2, p3, p4) {
	const [m1, b1] = calLine(p1, p2)
	const [m2, b2] = calLine(p3, p4)

	// parallel
	if (m1 == m2) return null

	let x
	let y
	if (!m1) {
		// l1 is vertical
		x = b1
		y = m2 * x + b2
	} else if (!m2) {
		// l2 is vertical
		x = b2
		y = m1 * x + b1
	} else if (b1 === b2) {
		// meet on y axis
		y = 6
		x = (y - b1) / m1
	} else {
		x = (b2 - b1) / (m1 - m2)
		y = m1 * x + b1
	}

	return [x, y]
}

function solve(lines, lBound, rBound) {
	let result = 0
	for (let i = 0; i < lines.length; i += 1) {
		let parse = lines[i].split('@')
		let cords = parse[0].split(',').map((cord) => parseInt(cord.trim()))
		let speeds = parse[1].split(',').map((speed) => parseInt(speed.trim()))

		const p1 = [cords[0], cords[1]]
		const p2 = [cords[0] + speeds[0], cords[1] + speeds[1]]

		for (let j = i + 1; j < lines.length; j += 1) {
			parse = lines[j].split('@')
			cords = parse[0].split(',').map((cord) => parseInt(cord.trim()))
			speeds = parse[1].split(',').map((speed) => parseInt(speed.trim()))

			const p3 = [cords[0], cords[1]]
			const p4 = [cords[0] + speeds[0], cords[1] + speeds[1]]

			const p = intersect(p1, p2, p3, p4)

			if (!p) continue

			const [x, y] = p

			// check for future path
			const valid1 = ((p2[0] - p1[0] > 0 && x > p1[0]) || (p2[0] - p1[0] < 0 && x < p1[0])) &&
				((p2[1] - p1[1] > 0 && y > p1[1]) || (p2[1] - p1[1] < 0 && y < p1[1]))
			const valid2 = ((p4[0] - p3[0] > 0 && x > p3[0]) || (p4[0] - p3[0] < 0 && x < p3[0])) &&
				((p4[1] - p3[1] > 0 && y > p3[1]) || (p4[1] - p3[1] < 0 && y < p3[1]))
			if (!valid1 || !valid2) continue

			// check for bound
			if (x >= lBound && x <= rBound && y >= lBound && y <= rBound) {
				// console.log(p1, p3, [x, y])
				result += 1
			}
		}
	}
	console.log(result)
}

const inputText = readFileSync('./input.txt', { encoding: 'utf-8' })
const lines = inputText.split('\n')

solve(lines, 200000000000000, 400000000000000)