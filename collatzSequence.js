/*
Generate Collatz Sequences and compare and discover sizes from sequences
To avoid state mutation, there is no default memoized sequence
*/

function* Range(start = 0, end = Infinity, step = 1) {
	for (let i = start; i <= end; i += step) {
		yield i;
	}
}

const sizeOf = (value, size = 0) => 
	value <= 1 ? size
	: value % 2 === 0 ? sizeOf(value/2, ++size)
	: sizeOf(value * 3 + 1, ++size);

const memoizeSequence = (size = 1e6) => {
    let sequence = new Array(size);
	for (let i = 0; i < size; i++){
    	sequence[i] = sizeOf(i + 1);
    }
    return sequence;
}

const biggestBetween = (initial = 1, final = 1e6) => {
	/*
	Returns an Array with the first value as the the number that has the 
	biggest Collatz Sequence size and the second as the actual sequence size
	*/
	let biggest = [undefined, -Infinity]; 
	let size;
	for (let index of Range(initial, final)) {
		size = sizeOf(index);
		console.log(`Index: ${index}, Size: ${size}`)
		if (size > biggest[1]) biggest = [index, size];
	}
	return biggest;
}

const smallestBetween = (initial = 1, final = 1e6) => {
	/*
	Returns an Array with the first value as the the number that has the 
	smallest Collatz Sequence size and the second as the actual sequence size
	*/
	let smallest = [undefined, Infinity]; 
	let size;
	for (let index of Range(initial, final)) {
		size = sizeOf(index);
		if (size < smallest[1]) smallest = [index, size];
	}
	return smallest;
}


//Example Usage: 

const biggestFrom = sequence => sequence.reduce((biggest, current, index) => current > biggest[1] ? [index, current] : biggest, [undefined, -Infinity]);
const smallestFrom = sequence => sequence.reduce((smallest, current, index) => current < smallest[1] ? [index, current] : smallest, [undefined, Infinity]);

const sequence = memoizeSequence(1000000);
const biggestFromMemoized = biggestFrom(sequence);
const smallestFromMemoized = smallestFrom(sequence);
const biggestFromRange = biggestBetween(0, 100);
const smallestFromRange = smallestBetween(0, 100);

console.log(`
Biggest From Memoized Sequence: 
    number: ${biggestFromMemoized[0] + 1}
    size: ${biggestFromMemoized[1]}
Smallest From Memoized Sequence: 
    number: ${biggestFromMemoized[0] + 1}
    size: ${biggestFromMemoized[1]}
Biggest From Range: 
    number: ${biggestFromRange[0]}
    size: ${biggestFromRange[1]}
Smallest From Range: 
    number: ${biggestFromRange[0]}
    size: ${biggestFromRange[1]}
`);
