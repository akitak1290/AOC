const path = require('path');
const fs = require('fs');
const readline = require('readline');

const INPUT_PATH = path.join(__dirname, 'input.txt')

/**
 * 
 * @param {string[]} lines 
 */
function part1(lines) {
	let result = 1
	const raceDuration = lines[0].split(":")[1].trim().split(/\s+/)
	const raceDistance = lines[1].split(":")[1].trim().split(/\s+/)

	// 0 <= dist < dist max
	// 0 <= speed * (race dist - speed) < dist max
	// this becomes a parabola with remainder, solve for whole numbers
	// from range 0 to remainder
	// anw, brute force...
	for (let i = 0; i < raceDuration.length; i++) {
		let solutionCnt = 0
		const dist = (x) => x * (raceDuration[i] - x)
		
		for (let j = 1; j < raceDuration[i]; j++) {
			if (dist(j) > raceDistance[i]) solutionCnt += 1
		}
		result *= solutionCnt
	}

	console.log(result)
}

/**
 * 
 * @param {string[]} lines 
 */
function part2(lines) {
	let result = 0
	const raceDuration = lines[0].split(":")[1].trim().split(/\s+/).join('')
	const raceDistance = lines[1].split(":")[1].trim().split(/\s+/).join('')

	for (let j = 1; j < raceDuration; j++) {
		if ((j * (raceDuration - j) > raceDistance)) result += 1
	}

	console.log(result)
}

// 2 native ways to read files with node are fs.readFileSync and readline
// former load the whole file but in this case it doesn't matter...?

const readStream = fs.createReadStream(INPUT_PATH)
const rl = readline.createInterface({
	input: readStream
})

const result = []
rl.on('line', (line) => {
	result.push(line)
})

rl.on('close', () => {
	part1(result)
	part2(result)
})
