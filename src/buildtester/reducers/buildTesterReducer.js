var initialState = require("./../../initialstate");

module.exports = function (state, action) {
	var newState = Object.assign({}, state); // Copy to a new state so we don't screw up the old one
	switch (action.type) {
		case "SPEND_POINTS":
			newState.points -= action.unit.cost;
			newState.army.push(action.unit);
			return newState;
		case "REFUND_POINTS":
			return initialState().buildtester;
		case "REMOVE_UNIT":
			newState.points += newState.army[action.id].cost;
			newState.army.splice(action.id, 1);
			return newState;
		default:
			return state || initialState().buildtester;
	}
};