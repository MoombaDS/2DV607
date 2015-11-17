var React = require("react"),
	LinkContainer = require("react-router-bootstrap").LinkContainer,
	IndexLinkContainer = require("react-router-bootstrap").IndexLinkContainer,
	Button = require("react-bootstrap").Button,
	ButtonGroup = require("react-bootstrap").ButtonGroup;

var Navigation = React.createClass({
	displayName: "Navigation",
    render: function() {
        return (
			<div>
					<ButtonGroup>
						<IndexLinkContainer to="/"><Button bsSize="small">Home</Button></IndexLinkContainer>
						<LinkContainer to="/counter"><Button bsSize="small">Counter</Button></LinkContainer>
						<LinkContainer to="/todo"><Button bsSize="small">TODO List</Button></LinkContainer>
						<LinkContainer to="/build"><Button bsSize="small">Build Tester</Button></LinkContainer>
					</ButtonGroup>
			</div>
		);
	}
});

module.exports = Navigation;