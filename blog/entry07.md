# World Maps and Persistence

### Deciding on a map representation

I spent quite a bit of time weighing my options for representing the game world, both on screen to the player, and in the game model. Much of this would also be highly dependent on how I would want the player to navigate the world - would they move through "doors" from one location to another, or would they have somewhat more freedom to roam the landscape?

Ultimately, I settled on a 2D array representation - each cell in the array contains an object detailing its segment of the map and represents a single tile within the world. This in itself made it incredibly easy to create a text-based minimap (and fog of war) using monospaced fonts, thus keeping with the overall theme of the game so far. Players are given the option to move in any of the four cardinal directions (so long as no obstacles are present). You can see it in action in the live version of the game at http://moombads.github.io/quest/

### Persisting data to local storage

Getting the data to persist to local storage was surprisingly simple. I had originally looked at a library by the name of `redux-localstorage` which has mulitple large classes. David, however, suggested that there were far easier ways to do this and that I should have a look into it on my own. Ultimately the solution I came up with is the following:

First we have a function:
``` javascript
const saveLocal = store => next => action => {
	let result = next(action);
	localStorage.setItem("Quest", JSON.stringify(store.getState()));
  	return result;
};
```
This will be applied as middleware when creating the store and will save a string rendition of the state to local storage under the key "Quest" after every action.

Next we have:
``` javascript
const savedState = () => {
	return JSON.parse(localStorage.getItem("Quest"));
};
```
An even simpler function that just grabs the string back from local storage and parses it back into an object.

To complete the setup, all we do is:
``` javascript
module.exports = Redux.applyMiddleware(saveLocal)(Redux.createStore)(rootReducer, savedState() || initialState());
```
Now we will check for a saved state on start-up and if it returns undefined, it will default back to the initial state!

The true challenge here was in fixing the horrible mess I had made of lines - they were stored using React elements as a part of the state which was a really bad decision. It took quite a bit of time to replace every single line in the game so far, but they are now tag free and just as effective as they originally were!