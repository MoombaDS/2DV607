/*
Redux Store
*/

var Redux = require("redux"),
	counterReducer = require("./reducers/counterReducer"),
	todoListReducer = require("./reducers/todolistReducer"),
	buildTesterReducer = require("./buildtester/reducers/buildTesterReducer"),
	initialState = require("./initialstate"),
	thunk = require("redux-thunk"); // for asynch actions

var rootReducer = Redux.combineReducers({
	counter: counterReducer,   // this means counterReducer will operate on appState.counter
	todo: todoListReducer,
	buildtester: buildTesterReducer
});

module.exports = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer,initialState());

