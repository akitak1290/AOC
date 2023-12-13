
/**
 * return sum of all the elements
 * in the array
 * @param {number[]} arr number array
 * @return {number} sum
 */
function sum(arr) {
	return arr.reduce((acc, cur) => acc + cur)
}

/**
 * memoize function that wraps around
 * a main function
 * @param {function(any) => any} cb 
 * @returns 
 */
function memoize(cb) {
	// utilize closure to keep this from GC
	const stored = new Map()

	return (...args) => {
		const k = JSON.parse(...args)
		
		if (stored.has(k)) return stored.get(k)
		const result = cb(...args)
		stored.set(k, result)
		return result
	}
}