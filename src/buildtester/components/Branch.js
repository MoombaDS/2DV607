var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	UnitButton = require("./UnitButton"),
	units = require("./../data/units"),
	Row = require("react-bootstrap").Row;

	var Branch = React.createClass({
	displayName: "Branch",
	propTypes: {
		onClick: proptypes.func.isRequired,
		category: proptypes.string.isRequired
	},
	render: function() {

		var buttons = [];

		units.forEach(function(unit, id) {
			if (unit.category === this.props.category) {
				buttons.push(<UnitButton key={id} unit={unit} onClick={this.props.onClick} />);
			}
		}.bind(this));

		return (
			<div>
				<Row className="tier-row">
					{buttons}
				</Row>
				<Row className="category-row">
					{this.props.category}
				</Row>
			</div>
		)
	}
});

module.exports = Branch;