var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	actions = require("./../buildtesteractions"),
	Label = require("react-bootstrap").Label,
	Button = require("react-bootstrap").Button,
	UnitButton = require("./UnitButton"),
	Branch = require("./Branch"),
	Grid = require("react-bootstrap").Grid,
	Row = require("react-bootstrap").Row,
	Col = require("react-bootstrap").Col;

var Tree = React.createClass({
	displayName: "Tree",
	propTypes: {
		points: proptypes.number.isRequired,
		army: proptypes.array.isRequired,
		spendPoints: proptypes.func.isRequired,
		refundPoints: proptypes.func.isRequired,
		removeUnit: proptypes.func.isRequired
	},
	handleClick: function(unit) {
		if (this.props.points >= unit.cost) {
			this.props.spendPoints(unit);
		}
	},
	render: function() {
		var displayArmy = [];

		this.props.army.forEach(function(unit, id) {
			displayArmy.push(<UnitButton onRemove={this.props.removeUnit.bind(null, id)} key={id} unit={unit} />);
		}.bind(this));

		return (
			<Grid fluid>
				<Row className="top-row">
					<Col xs={18} md={12}>
						<Row className="army-row">
							{displayArmy}
						</Row>
						<Row>
							<Label>Remaining points: {this.props.points}</Label>
						</Row>
					</Col>
				</Row>
				<Row className="tree-row">
					<Col className="enforcer-col" xs={3} md={2}>
						<Branch category="Enforcer" onClick={this.handleClick}/>
					</Col>
					<Col className="guardian-col" xs={3} md={2}>
						<Branch category="Guardian" onClick={this.handleClick}/>
					</Col>
					<Col className="wanderer-col" xs={3} md={2}>
						<Branch category="Wanderer" onClick={this.handleClick}/>
					</Col>
					<Col className="footpad-col" xs={3} md={2}>
						<Branch category="Footpad" onClick={this.handleClick}/>
					</Col>
					<Col className="evoker-col" xs={3} md={2}>
						<Branch category="Evoker" onClick={this.handleClick}/>
					</Col>
					<Col className="invoker-col" xs={3} md={2}>
						<Branch category="Invoker" onClick={this.handleClick}/>
					</Col>
				</Row>
				<Row className="bottom-row">
					<Col xs={18} md={12}>
						<Button onClick={this.props.refundPoints}>Refund Points</Button>
					</Col>
				</Row>
			</Grid>
		)
	}
});

var mapStateToProps = function (state) {
	return { points: state.buildtester.points, army: state.buildtester.army };
};

var mapDispatchToProps = function (dispatch) {
	return {
		spendPoints: function(unit) {
			dispatch(actions.spendPoints(unit));
		},
		refundPoints: function() {
			dispatch(actions.refundPoints());
		},
		removeUnit: function(id) {
			dispatch(actions.removeUnit(id));
		}
	}
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Tree);