var initialState = require("./../../initialstate");

module.exports = function (state, action) {
	var newState = Object.assign({}, state); // Copy to a new state so we don't screw up the old one
	switch (action.type) {
		case "SPEND_POINTS":
			newState.points -= action.cost;
			return newState;
		case "REFUND_POINTS":
			newState.points = 10; // TODO
			return newState;
		default:
			return state || initialState().buildtester;
	}
};