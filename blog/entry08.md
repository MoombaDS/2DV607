# Getting side-tracked: Unit Testing and Code Coverage

Recently, amidst a flurry of performing oral examinations on unfortunate students as part of LNU's Software Testing course, I've begun to feel a pressing need to try out the testing frameworks available for JavaScript and node.js. To say it has been a challenge would probably be something of an understatement - while there is a fair amount of documentation out there and React even provides its own [utilities](https://facebook.github.io/react/docs/test-utils.html) for the task, there were many bumps in the road.

### Travis CI

The journey began with a sudden desire to make use of [Travis CI](https://travis-ci.org/) for the purpose of continuous integration testing on my project. I had actually never used Travis before so the experience was pretty new to me. Configuration and set up is extremely simple, requiring only that you sign in with your GitHub account, toggle a switch for the desired repository, and add a `.travis.yml` file to the root of your repository. I'll mention this file again a little later. Once this is all done, whenever you make a commit or someone makes a pull request, Travis will build and run all your tests to let you know if the new build is passable! If you have nothing better to do (like me), you can sit and stare at the process as it executes too!

### Tools

After a small amount of digging, I came across [Mocha](https://mochajs.org/), an extremely handy node.js testing framework with a fairly rich list of features. Coupled with [Chai](http://chaijs.com/) for its robust `expect` functionality I had the majority of the things I would need to begin writing unit tests. While I have not reached a point where I have begun using mocks or stubs in my tests, I fully intend to make use of [Sinon](http://sinonjs.org/) when I get there!

Writing unit tests with these tools has been extremely intuitive so far, as a very simple example:

``` JavaScript
describe("actions", ()=> {
	it("should create an action to set name", ()=> {
		const name = "Name";
		const expectedAction = {
			type: constants.SET_NAME,
			name: name
		};
		expect(actions.setName(name)).to.deep.equal(expectedAction);
	});
});
```
We define our test, set our expected results, and then use Chai's `expect` function to confirm that the function returns what we're looking for. In this case, I'm checking that one of my action functions returns the correct action for dispatch. For more information on testing parts of Redux, you can take a look at the [documentation](http://rackt.org/redux/docs/recipes/WritingTests.html) on the subject (it gets pretty fun when we start mocking the store for testing async actions!).

If only we could have stopped here things would have been far more painless. Unfortunately, I had need of a coverage metric to make it easier to pinpoint the locations in my code that had yet to be tested. It would seem that most code coverage tools do not play nicely with React out of the box. I tried a vast multitude of options before finally coming to the conclusion that I would need to use some other sort of helper to get things working. Ultimately, the best solution came in the form of [Karma](http://karma-runner.github.io/0.13/index.html), a testing environment that helps to somewhat streamline the process. To get this up and running properly, I followed [this](https://medium.com/@scbarrus/how-to-get-test-coverage-on-react-with-karma-babel-and-webpack-c9273d805063) extremely handy guide, but with a few modifications of my own.

My final `karma.conf.js` file looks like this:
``` JavaScript
var webpack = require('webpack');

module.exports = function (config) {
	config.set({
		browsers: [ 'Firefox' ],
		singleRun: true,
		frameworks: [ 'mocha' ],
		files: [
			'tests.webpack.js'
		],
		plugins: [ 'karma-firefox-launcher', 'karma-chai', 'karma-mocha',
			'karma-sourcemap-loader', 'karma-webpack', 'karma-coverage',
			'karma-mocha-reporter'
		],
		preprocessors: {
			'tests.webpack.js': [ 'webpack', 'sourcemap' ]
		},
		reporters: [ 'mocha', 'coverage' ], 
		webpack: { 
			devtool: 'inline-source-map', 
			module: {
				loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.json$/,
					exclude: /node_modules/,
					loader: 'json-loader'
				}
				],
				postLoaders: [ { 
					test: /\.js$/,
					exclude: /test|node_modules/,
					loader: 'istanbul-instrumenter' } ]
			}
		},
		webpackServer: {
			noInfo: true 
		},
		coverageReporter: {
			type: 'lcov', 
			dir: 'coverage/' 
		}
	});
};
```
The primary modifications I made were to ensure that the coverage reports were provided in lcov format so they could be used with [coveralls](https://coveralls.io/) and modifying the loaders to account for the multitude of JSON files in my project. I also had to make changes to the exclude regex for the postLoaders as the original regex provided in the tutorial did not seem to want to function correctly.

With this done, all that remained was to properly set everything up with Travis, which brings us back to my `.travis.yml` file:

``` YAML
language: node_js

node_js:
  - "4.1"

before_install:
 - "export DISPLAY=:99.0"
 - "sh -e /etc/init.d/xvfb start"

script:
 - npm run lint
 - npm run build
 - npm test

after_success:
 - cat coverage/*/lcov.info | ./node_modules/coveralls/bin/coveralls.js

branches:
  only:
    - gh-pages
```
First we specify the language we're using (easy). After this, I use a `before_install` in order to set up the virtual screen to run Firefox so that I can use Karma for my testing and code coverage. We then trigger our scripts - I choose to lint, build and then run my test suite. Once this is done, an `after_success` sends the coverage data to coveralls. Lastly, I inform Travis that it should only use the gh-pages branch. Right now, the three listed scripts are defined in my `package.json` file as:

``` JSON
"scripts": {
	"build": "webpack",
	"lint": "eslint src",
	"test": "karma start"
}
```
Pretty simple huh?

Now that everything is set up, whenever I make a commit or someone makes a pull request, Travis will run the scripts, check that the build passes all my tests, and pass on the coverage metric to coveralls, allowing me to have two nice new buttons in my readme file!