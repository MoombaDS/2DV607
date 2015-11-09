/*
This is the entry point for the app! From here we merely import our routes definitions,
then use React and React-DOM to render it.
*/

var React = require("react"),
	ReactDOM = require("react-dom"),
	Provider = require("react-redux").Provider,
	store = require("./store"),
	Counter = require("./components/counter");

var HelloWorld = React.createClass({
	displayName: "Hello",
	render: function() {
		return (
			<div className="helloWorld">
				<h1>Hello, world!</h1>
			</div>
		);
	}
});

ReactDOM.render(
	<Provider store={store}>
		<div>
		<center>
  			<HelloWorld />
  			<Counter />
  		</center>
  		</div>
	</Provider>,
  document.getElementById("root")
);