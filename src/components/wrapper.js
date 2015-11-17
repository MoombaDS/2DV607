var React = require('react'),
	Navigation = require("./navigation");

var Wrapper = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
            	<Navigation />
                <h2>Project Stuff!</h2>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Wrapper;