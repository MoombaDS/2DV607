var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	Image = require("react-bootstrap").Image,
	OverlayTrigger = require("react-bootstrap").OverlayTrigger,
	Popover = require("react-bootstrap").Popover,
	Button = require("react-bootstrap").Button;

	var UnitButton = React.createClass({
	displayName: "Branch",
	propTypes: {
		unit: proptypes.object.isRequired
	},
	render: function() {
		var tooltip = (
			<Popover className="tooltip" title={<strong>{this.props.unit.name}</strong>} id={this.props.unit.name}>
				<p>
					{this.props.unit.tooltip}
				</p>
				<p>
					Cost: {this.props.unit.cost}
				</p>
			</Popover>
		);

		return (
			<span>
				<OverlayTrigger placement="left" overlay={tooltip}>
					<Image className="abilityButton" onClick={this.props.onClick && this.props.onClick.bind(null, this.props.unit)} src={"./img/"+ this.props.unit.icon} rounded />
				</OverlayTrigger>
				{(() => {
					if (this.props.onRemove) {
						return (<Button bsSize="xsmall" onClick={this.props.onRemove} className="remove-button">&times;</Button>);
					}
				})()}
			</span>
		)
	}
});

module.exports = UnitButton;