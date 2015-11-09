var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	actions = require("./../actions");

var TODOList = React.createClass({
	displayName: "TODO List",
	propTypes: {
		addtask: proptypes.func.isRequired,
		jobs: proptypes.arrayOf(proptypes.string).isRequired
	},
	getInitialState: function() {
		return { name: "" };
	},
	handleSubmit: function(event) {
		if (event.keyCode == 13) { // If it's enter key
			this.props.addtask(this.state.name);
			this.setState({ name: "" });
		}
	},
	handleChange: function(event) {
		this.setState({ name: event.target.value });
	},
	render: function() {
		var list = this.props.jobs.map(function(task,n){
			return <li key={n}>{task}</li>;
		});
		return (
			<div>
				<h2>TODO List</h2>
				<input type="text" placeholder="Enter item" value={this.state.name} onChange={this.handleChange} onKeyDown={this.handleSubmit} />
				<ul>
					{list}
				</ul>
			</div>
		)
	}
});

var mapStateToProps = function (state) {
	return {jobs: state.todo.jobs};
};

var mapDispatchToProps = function (dispatch) {
	return {
		addtask: function(name) {
			dispatch(actions.addTask(name));
		}
	}
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TODOList);