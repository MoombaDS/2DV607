var React = require("react");

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

module.exports = HelloWorld;