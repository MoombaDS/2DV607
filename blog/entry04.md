# Different methods of linking with Bootstrap

Recently I made a pull request to the Guild which birthed a short discussion about the different methods for displaying which links are active when using React Router together with Bootstrap. In this post I will attempt to make a short comparison of the three in order to try and decide which might be the better option. I am no expert so all following writings should be taken with a (very large) grain of salt!

### Method 1

Normally when working with React Router, we simply make use of the Link (or IndexLink) components which automatically apply their activeClassName/activeStyle when their specified route is active. Example:

```javascript
<Link to="/home" activeClassName="current">A link</Link>
```

As can be seen, this method provides an extremely simple and clean way of handling links (you hardly have to do anything beyond defining routes really!). Why would you want to use a different method at all?

The bad news: This method does not play nicely with Bootstrap.

Which brings us to...

### Method 2

Since we can't use React Router's links directly our first option is to come up with our own way around it. The simplest way to do this is to take advantage of React Router's History Mixin!

With this method, we make use of the isActive (https://github.com/rackt/react-router/blob/master/docs/API.md#isactivepathname-query-indexonly) function provided by the History Mixin. When supplied with a path, this function can evaluate whether the current path (and every route in the route branch) is active (unless we specify it as indexOnly, in which case it will match only the exact path). With this information in hand, we can then supply the result of this function directly to the navigation element in question and use this to decide whether to display an active style or not.

Something like (simplified):

```javascript
var isActive = self.history.isActive(a_path, {}, isIndexLink);

<NavItem href={a_path} active={isActive}>A Link</NavItem>

```

This seems to work just as effectively as the previous method, though, to me, it feels a little less intuitive. It doesn't look as pretty either!

### Method 3

We're already using plenty of libraries right? So why not throw in another extremely lightweight one which essentially reverts us back to using a method very similar to the first?!

```javascript
<LinkContainer to="/home">A link</LinkContainer>
```

Look familiar? This is exactly what React-Router-Bootstrap (https://github.com/react-bootstrap/react-router-bootstrap) does.

However, under the hood, React-Router-Bootstrap is actually doing _exactly_ the same thing as we did in method 2. The only true difference is that there are a few minor features of the original Link method which are retained by React-Router-Bootstrap's LinkContainer component. Personally, however, this seems to provide more easily readable and simplified code (which is good right?)

Ultimately it would seem that the decision boils down to this:
* Do we want to use a method which involves more complex aspects of React Router and could potentially confuse newer users of the library? 
-or- 
* Do we want to use a tiny library which takes this exact same functionality and turns it into a component that works as intuitively as the Link component would without Bootstrap?

My personal preference always errs towards what is intuitive to use, and as such, I would most likely want to take the latter option!