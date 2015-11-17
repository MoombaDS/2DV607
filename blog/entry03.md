# Bootstrap

Recently I've been starting to work a little more on my project now that I've had some fun experimenting with the code from the Guild and making pull requests there. After getting a very barebones skeleton of some of the components that will comprise my planned "Build Calculator" I finally grew tired of the horrible layout and lack of any kind of css or styling in the pages.

### Enter Bootstrap

Bootstrap is a wonderful front-end framework which makes designing pleasing sites criminally easy. When working with React, we can use React-Bootstrap (which is available at https://react-bootstrap.github.io/ ) to make implementation nice and simple! To install with npm to our project we just use:

```
$ npm install --save-dev react-bootstrap
```

Once you have the module installed, all you need to do is add a line to the head portion of your index.html file in order to reference the Bootstrap CSS and you're good to go! The line in question is:

```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
```

Now we can import any of the components with a short require in our js files such as:

```
var Button = require('react-bootstrap').Button;
```

which we can use to create buttons!

The only issue I came across initially was that buttons and the like did not want to play very nicely with React Router, which is why there's also a very handy integration project by the title of react-router-bootstrap (which you can get at https://github.com/react-bootstrap/react-router-bootstrap ). This nicely eradicates these issues entirely!
