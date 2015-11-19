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

		var tier1 = [];
		var tier2 = [];
		var tier3 = [];

		units.forEach(function(unit, id) {
			if (unit.category === this.props.category) {
				switch(unit.tier) {
					case 1:
						tier1.push(<UnitButton key={id} unit={unit} onClick={this.props.onClick} />);
						break;
					case 2:
						tier2.push(<UnitButton key={id} unit={unit} onClick={this.props.onClick} />);
						break;
					case 3:
						tier3.push(<UnitButton key={id} unit={unit} onClick={this.props.onClick} />);
						break;
					default:
						console.log("Incorrect tier supplied: " + unit.name);
						break;
				}
			}
		}.bind(this));

		return (
			<div>
				<Row className="tier3-row">
					{tier3}
				</Row>
				<Row className="tier2-row">
					{tier2}
				</Row>
				<Row className="tier1-row">
					{tier1}
				</Row>
				<Row className="category-row">
					{this.props.category}
				</Row>
			</div>
		)
	}
});

module.exports = Branch;