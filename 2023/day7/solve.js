const path = require('path');
const fs = require('fs');
const readline = require('readline');

const HandType = {
	'FiveDup': 6,
	'FourDup': 5,
	'FullHouse': 4,
	'ThreeDup': 3,
	'DoublePair': 2,
	'OnePair': 1, 
	'HighCard': 0
}

const CardType1 = {
	'A': 12,
	'K': 11,
	'Q': 10,
	'J': 9,
	'T': 8,
	'9': 7,
	'8': 6,
	'7': 5,
	'6': 4,
	'5': 3,
	'4': 2,
	'3': 1,
	'2': 0
}

const CardType2 = {
	'A': 12,
	'K': 11,
	'Q': 10,
	'T': 9,
	'9': 8,
	'8': 7,
	'7': 6,
	'6': 5,
	'5': 4,
	'4': 3,
	'3': 2,
	'2': 1,
	'J': 0
}

/**
 * 
 * @param {string} hand 
 * @param {boolean} jokerRule 
 * @returns 
 */
function getHandType(hand, jokerRule) {
	if (hand.length !== 5) return -1

	const chars = {}
	for (const char of hand) {
		if (char in chars) chars[char] += 1
		else chars[char] = 1
	}

	const charsCnt = Object.values(chars)
	if (charsCnt.length === 5) {
		if (jokerRule && 'J' in chars) return HandType.OnePair
		else return HandType.HighCard
	}
	else if (charsCnt.length === 4) {
		if (jokerRule && 'J' in chars) return HandType.ThreeDup
		else return HandType.OnePair
	}
	else if (charsCnt.length === 1) return HandType.FiveDup
	else if (charsCnt.length === 3) {
		if (charsCnt.find((n) => n === 3)) {
			if (jokerRule && 'J' in chars) return HandType.FourDup
			else return HandType.ThreeDup
		}
		else {
			if (jokerRule && 'J' in chars) {
				if (chars['J'] === 2) return HandType.FourDup
				else return HandType.FullHouse
			}
			else return HandType.DoublePair
		}
	} else if (charsCnt.length === 2) {
		if (jokerRule && 'J' in chars) return HandType.FiveDup

		if (charsCnt.find((n) => n === 4)) return HandType.FourDup
		else return HandType.FullHouse
	} else {
		return -1 // what's this?
	}
}

/**
 * 
 * @param {string[]} lines 
 */
function solve(lines, jokerRule) {
	const hands = {}
	const CardType = jokerRule ? CardType2 : CardType1
	for (const line of lines) {
		const lineParse = line.split(' ')
		hands[lineParse[0]] = lineParse[1]
	}
	
	const handsSorted = Object.keys(hands)
	handsSorted.sort((a, b) => {
		const handA = getHandType(a, jokerRule)
		const handB = getHandType(b, jokerRule)
		if (handA > handB) {
			return 1;
		} else if (handA < handB) {
			return -1;
		} else {
			for (let i = 0; i < a.length; i++) {
				if (CardType[a[i]] > CardType[b[i]]) return 1
				if (CardType[a[i]] < CardType[b[i]]) return -1
			}

			return 0
		}
	})

	const winning = handsSorted.reduce((acc, curr, idx) => acc + hands[curr] * (idx + 1), 0)
	console.log(winning)
}


const INPUT_PATH = path.join(__dirname, 'input.txt')
const readStream = fs.createReadStream(INPUT_PATH)
const rl = readline.createInterface({
	input: readStream
})

const lines = []
rl.on('line', (line) => lines.push(line))

rl.on('close', () => {
	solve(lines, false)
	solve(lines, true)
})