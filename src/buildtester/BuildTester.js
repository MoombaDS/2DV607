var React = require("react"),
	ReactDOM = require("react-dom"),
	Provider = require("react-redux").Provider,
	Tree = require("./components/Tree");

var BuildTester = React.createClass({
	displayName: "Tree",
	render: function() {
		return (
			<div>
				<Tree />
			</div>
		);
	}
});

module.exports = BuildTester;