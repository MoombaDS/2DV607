var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    Wrap = require('./components/wrapper'),
    Home = require('./components/home'),
    Counter = require("./components/counter"),
    TODOList = require("./components/todolist"),
    BuildTester = require("./buildtester/BuildTester");

module.exports = (
    <Route path='/' component={Wrap}>
        <IndexRoute component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/todo" component={TODOList} />
        <Route path="/build" component={BuildTester} />
    </Route>
);