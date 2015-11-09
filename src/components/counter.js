var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	actions = require("./../actions");

var Counter = React.createClass({
	displayName: "Counter",
	propTypes: {
		decrement: proptypes.func.isRequired,
		increment: proptypes.func.isRequired,
		value: proptypes.number.isRequired
	},
	render: function() {
		return (
			<div>
				<p>Counter: {this.props.value}</p>
				<p>
					<button onClick={this.props.increment}>+</button>
					<button onClick={this.props.decrement}>-</button>
				</p>
			</div>
		)
	}
});

var mapStateToProps = function (state) {
	return {value: state.counter.value };
};

var mapDispatchToProps = function (dispatch) {
	return {
		increment: function() {
			dispatch(actions.incrementCounter());
		},
		decrement: function() {
			dispatch(actions.decrementCounter());
		}
	}
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Counter);