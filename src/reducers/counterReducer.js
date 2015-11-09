var initialState = require("./../initialstate");

module.exports = function (state, action) {
	var newState = Object.assign({}, state); // Copy to a new state so we don't screw up the old one
	switch (action.type) {
		case "INC_COUNTER":
			newState.value += 1;
			return newState;
		case "DEC_COUNTER":
			newState.value -= 1;
			return newState;
		default:
			return state || initialState().counter;
	}
};