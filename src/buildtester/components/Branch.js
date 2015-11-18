var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	AbilityButton = require("./AbilityButton"),
	actions = require("./../buildtesteractions"),
	Label = require("react-bootstrap").Label,
	Button = require("react-bootstrap").Button;

	var Branch = React.createClass({
	displayName: "Branch",
	propTypes: {
		points: proptypes.number.isRequired,
		spendPoints: proptypes.func.isRequired,
		refundPoints: proptypes.func.isRequired
	},
	handleClick: function() {
		if (this.props.points >= 2) {
			this.props.spendPoints(2);
		}
	},
	render: function() {
		return (
			<div>
				<div>
				<Label>Remaining points: {this.props.points}</Label>
				</div>
				<div>
				<AbilityButton onClick={this.handleClick} />
				</div>
				<div>
				<Button onClick={this.props.refundPoints}>Refund Points</Button>
				</div>
			</div>
		)
	}
});

var mapStateToProps = function (state) {
	return { points: state.buildtester.points };
};

var mapDispatchToProps = function (dispatch) {
	return {
		spendPoints: function(cost) {
			dispatch(actions.spendPoints(cost));
		},
		refundPoints: function() {
			dispatch(actions.refundPoints());
		}
	}
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Branch);