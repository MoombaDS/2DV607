var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	Image = require("react-bootstrap").Image;

	var AbilityButton = React.createClass({
	displayName: "Branch",
	propTypes: {
		onClick: proptypes.func.isRequired
	},
	render: function() {
		return (
				<Image className="abilityButton" onClick={this.props.onClick} src="./img/test.jpg" rounded />
		)
	}
});

module.exports = AbilityButton;