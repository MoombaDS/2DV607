/*
Redux Store
*/

var Redux = require("redux"),
	counterReducer = require("./reducers/counterReducer"),
	todoListReducer = require("./reducers/todolistReducer"),
	initialState = require("./initialstate"),
	thunk = require("redux-thunk"); // for asynch actions

var rootReducer = Redux.combineReducers({
	counter: counterReducer,   // this means counterReducer will operate on appState.counter
	todo: todoListReducer
});

module.exports = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer,initialState());
