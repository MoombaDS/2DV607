var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	AbilityButton = require("./AbilityButton");

	var Branch = React.createClass({
	displayName: "Branch",
	render: function() {
		return (
			<div>
				<AbilityButton />
			</div>
		)
	}
});

module.exports = Branch;