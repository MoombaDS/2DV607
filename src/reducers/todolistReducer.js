var initialState = require("./../initialstate");

module.exports = function (state, action) {
	var newState = Object.assign({}, state); // Copy to a new state so we don't screw up the old one
	switch (action.type) {
		case "ADD_TASK":
			newState.jobs.push(action.name);
			return newState;
		default:
			return state || initialState().todo;
	}
};