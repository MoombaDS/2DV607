# Unit-testing JavaScript applications

I have spoken briefly about [testing in JavaScript](https://github.com/MoombaDS/2DV607/blob/gh-pages/blog/entry08.md) before, but as part of my "deep dive" I thought I would take things a little... "deeper" as it were. Not only will I take a more thorough look at the tools available for creating unit tests in a JavaScript project, but also at testing methods and the purpose behind them. The main focus of this entry will be on [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/), though I will also lightly touch upon [Karma](http://karma-runner.github.io/0.13/index.html), [expect](https://github.com/mjackson/expect), and [istanbul](https://gotwarlost.github.io/istanbul/). In terms of concepts, I will attempt to cover a few varying things, such as:

- the essentials of unit testing
- stubbing, mocking, and spying
- code coverage

So why do we test in the first place? It's certainly not to become 100% bug free - that's pretty much never going to happen in a system of any substantial size! That's not to say that vigilant unit testing and good design practices won't minimise the number of bugs when compared to working without tests of course. At its core, we write unit tests with the hope of improving our code, ensuring that we have an automated testing suite to help prevent regressions through regression testing, and perhaps most importantly, to build confidence in the product we're creating. To some degree, it also helps us (and others) better understand the code we're writing by providing a means to define expected behaviour (assuming we write our tests correctly of course!)

### Karma

Before I truly begin to get into the finer details of unit testing in JavaScript and the frameworks I have chosen to examine, I think it would be best to mention what role Karma plays in my test efforts. Unlike Mocha, Chai, or Sinon, Karma is not really a testing framework or library per se - in fact it is specifically billed as being framework-agnostic in that it will work with whatever framework you desire. "If it does not contribute directly to the test effort in the same way as the aforementioned frameworks, why even bother?" you might ask. Karma's primary purpose is generally as a test runner - it will execute the tests for you. "But we can do that anyway!" This may be true, but Karma gives us a few bonuses that we might not otherwise take into account. DOM APIs are not necessarily always consistent across browsers - Karma allows us to actually run our tests in a real browser, letting us ensure that all tests will actually pass in a real environment and not just in Node! React itself does not always play nicely with many of the tools we want to use in thorough testing - making use of Karma helps to get around these barriers too (most notably code coverage and istanbul!)

Naturally Karma comes with far more perks than this, but these are the points most relevant in what I will be discussing so I leave the rest up to the reader to find out (the [homepage](http://karma-runner.github.io/0.13/index.html) has a pretty thorough description.)

### Mocha

So what is a unit test? Or even a unit for that matter? We generally consider a unit to be the smallest unit of testable code in a system - this can be anything from a function to a component depending on how we want to look at things. Automated unit testing is the practice of writing individual tests that can be repeatedly re-run in order to test these units. In their simplest form, unit tests merely run a small portion of the code under test and make assertions on the results.

At the core of any good unit testing effort is the framework. In this case, the framework I will be discussing is [Mocha](https://mochajs.org/). A simple Mocha unit test will look something like:

```javascript
describe("some tests", ()=> {
	it("should perform some specific behaviour", ()=> {
		expect(myFunction(5)).to.equal(10);
	});
});
```

In this (incredibly oversimplified) example, we make use of Chai's expect style assertions which I'll get into more later. Since Mocha itself does not provide any assertion tools, we have to look to outside libraries for this functionality. As with Karma's framework-agnosticism, this allows for a fair bit of freedom when choosing an assertion library - we can essentially choose whatever library we feel most comfortable with.

There are many other features to Mocha, such as asynchronous testing (as opposed to the synchronous test above), before and after hooks (to allow clean-up and setup before and after each test), test duration reporting, and many others. These are all fully documented on the framework's homepage in a concise and understandable manner so I feel it would be redundant to go into too much detail here.

### Assertion with Chai

While not all unit tests necessarily require any forms of assertion (smoke testing for example), the most basic certainly do. Since, as stated above, Mocha does not natively provide an assertion layer, we need to add another library for this purpose. The two that seem to come most recommended are [expect](https://www.npmjs.com/package/expect.js) and [Chai](http://chaijs.com/). Both libraries make use of behaviour-driven development styled assertions, with expect (unsurprisingly) giving access to the `expect` function and Chai providing `expect`, `should`, and an `assert` much in the same vein as that provided by node.js. Since the majority of tests I have written in JavaScript have made use only of the `expect` function, perhaps it would be sufficient to use expect over Chai. The functionality that ultimately swayed me in the direction of Chai was the ability to chain together multiple assertions such as `expect({ foo: 'baz' }).to.have.property('foo').and.not.equal('bar');` - something not mentioned in the documentation for expect. It is also claimed that Chai receives more active development and can be more consistent when it comes to `undefined` and `null` values.

Writing our expect statements in Chai is quite intuitive thanks to the flow of their language chains and we merely end up with things like:

```javascript
expect(a).to.equal(10);
expect(b).to.include.keys("key");
expect(c).to.be.at.least(20);
expect(d).to.throw(Error);
```

Or if you prefer the `should` style:

```javascript
a.should.equal(10);
b.should.include.keys("key");
c.should.be.at.least(20);
d.should.throw(Error);
```

### Stubbing, mocking, and spying with Sinon

Functions do not always exist independently of other constructs. In many situations we may pass around functions or variables and make use of them in other functions. In unit testing, we only want our tests to be dependent on the function being tested and not potentially contaminated by outside sources which may have been incorrectly implemented. For this reason we often want to stub objects or functions within our code, essentially telling them to return a set response whenever a particular function is called rather than actually running the function in question. Using these canned responses eliminates any potential of errors within a unit test being the fault of a function outside our concern. With [Sinon](http://sinonjs.org/), stubbing a function is as easy as:

```javascript
let stub = sinon.stub(someObject, "methodname");
stub.returns("canned response");
expect(someFunction(someObject)).to.equal("I received a canned response");
```

Now whenever the function `someObject.methodname()` is called, the return value will always be a string containing the words `canned response`. When we want to get our original functionality back for other tests, we just write:

```javascript
stub.restore();
```

Additionally, any of these calls can actually be made on the object or function originally stubbed, for example:

```javascript
sinon.stub(someObject, "methodname");
someObject.methodname.returns("canned response");
expect(someFunction(someObject)).to.equal("I received a canned response");
someObject.methodname.restore();
```

There are often cases when we want to do more than just assert that the state of an application is as we expect it to be - sometimes we want to check to ensure that the functions we're testing behave correctly, making expected calls to other functions and the like. This kind of behavioural testing is generally done through mocking and spying. In essence, a mock is very similar to a stub - the only difference is that we verify the calls made to the mock object or function to ensure that they were ever made, made a certain number of times, made in a certain order, and so on. Once again, Sinon makes this process nice and simple:

```javascript
sinon.mock(someObject).expects("someMethod").atLeast(2);
someFunction(someObject);
someObject.verify();
```

In this case we mock `someObject.someMethod()` and state that we expect it to be called at least twice. We then pass the mocked object to the function we're testing, and then call `verify()` to check whether or not the expectations were met. With Sinon, the call to `verify()` also restores the original functions.

Many people disagree on the use of spies in testing. Unlike mocks, spies retain the original functionality of the method while still holding the capability to make similar checks on how many times it was called and so on. Given that we use mocks and stubs to avoid the original functionality of a method, it should be fairly apparent why this might not always be desirable in unit testing. There can, however, be cases in which the need to use a spy is unavoidable, perhaps due to the nature of the calls made within the function we're testing and how they interact with each other. In Sinon we define a spy like this:

```javascript
sinon.spy(console, "log");
someFunctionThatLogsToConsole();
expect(console.log.called).to.be.true;
```

Here we are spying on `console.log` to ensure that it is actually called within the body of `someFunctionThatLogsToConsole`. We can also assert whether it has been called exactly once, never called, called before (or after) another spy, called a specific number of times, and so on.

Sinon also provides many other useful functions for faking various other aspects that can make JavaScript applications difficult to test. As these don't really hold any relevance to my test suite or goals here, I won't go into any detail of them. However, unsurprisingly, these are well documented on Sinon's homepage.

### Code coverage with istanbul

Code coverage can be an incredibly useful metric. While having high levels of coverage might not necessarily mean we have eliminated all bugs in the covered code (we might not even be checking anything in the tests that call the code, just running it!), it can be very helpful for identifying new potential test cases when observing which parts of the code might not be sufficiently covered by tests.

[Istanbul](https://gotwarlost.github.io/istanbul/) is one such tool designed to measure code coverage within JavaScript projects. Unfortunately it doesn't play too well with JSX and React out of the box, which was one of my main motivations for making use of Karma to get it working properly. As part of its metric, istanbul keeps track of statement, branch, and function coverage while providing its reports in a number of different formats depending on your preference. Personally I choose to use a combination of HTML for my own readability, and LCOV in order to facilitate compatibility with [Coveralls](https://coveralls.io/). An example of how these coverage reports might look can be found [here](http://gotwarlost.github.io/istanbul/public/coverage/lcov-report/index.html) on their homepage. You can also take a look at how it's handled by Coveralls in the [entry for my project](https://coveralls.io/github/MoombaDS/quest).

Hopefully this deep dive might give some more insight on automated unit testing in JavaScript and how to get started on that front!