module.exports = {
	incrementCounter: function() {
		return {type: "INC_COUNTER"};
	},
	decrementCounter: function() {
		return {type: "DEC_COUNTER"};
	},
	addTask: function(name) {
		return {type: "ADD_TASK", name: name};
	}
};