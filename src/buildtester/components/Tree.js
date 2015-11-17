var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	Branch = require("./Branch");

var Tree = React.createClass({
	displayName: "Tree",
	render: function() {
		return (
			<div>
				<Branch />
			</div>
		)
	}
});

module.exports = Tree;