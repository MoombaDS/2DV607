var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	Button = require("react-bootstrap").Button;

	var AbilityButton = React.createClass({
	displayName: "Branch",
	render: function() {
		return (
			<div>
				<Button bsStyle="primary" bsSize="large">Button</Button>
			</div>
		)
	}
});

module.exports = AbilityButton;