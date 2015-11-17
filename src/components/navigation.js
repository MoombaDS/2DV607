var React = require("react"),
	Link = require("react-router").Link;

var Navigation = React.createClass({
	displayName: "Navigation",
    render: function() {
        return (
			<div>
				<Link to="/">Home</Link>&nbsp;
				<Link to="/counter">Counter</Link>&nbsp;
				<Link to="/todo">TODO List</Link>&nbsp;
				<Link to="/build">Build Tester</Link>
			</div>
		);
	}
});

module.exports = Navigation;