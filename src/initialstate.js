module.exports = function() { // Returns a function so it can't be modified accidentally
	return {
		counter: {
			value: 0 // Initial state of the counter
		},
		todo: {
			jobs: ["Sleep"]
		}
	}
};