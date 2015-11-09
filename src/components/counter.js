var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	actions = require("./../actions");

var Counter = React.createClass({
	propTypes: {
		increment: proptypes.func.isRequired,
		decrement: proptypes.func.isRequired
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
	return state.counter;
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