# A procedural text-based roguelike RPG

After a great deal of thought, I made the decision to change my project to something a little more substantial than what I had originally planned. It took me very little time before I reached a point where my previous build calculator felt more or less feature complete (albeit lacking in data). Instead, I have chosen to be a little more ambitious and attempt to implement an entire procedurally generated text-based roguelike RPG!

So far, I have only implemented the character creation, which you can check out at: http://moombads.github.io/quest/

I'd like to mention a few details about some of the implementation and my plans at this point in time. So far, all gameplay elements such as character classes, weapons, and items, are represented as JSON files to allow for extremely easy addition of new options and modification of existing ones. To add a new class for example, I merely need to create a new JSON file, add it as a require in `class.js`, optionally add a CSS tag with the same name, and voila! We have a new class available during selection. The code in place is designed to immediately account for the new addition at class selection time. The same holds true for adding items and equipment, and even for adding commands and examples to the help/instruction section!

In order to give a bit more weight to the whole application and make it feel a bit like you could actually be interacting with another individual, I make use of the `Redux Thunk` asynch dispatches to delay the dispatch of certain messages by NPCs and the system. 

### TODO

Right now there are several things on my immediate TODO list (not counting other goals further down the line). Firstly is persistence between sessions. Since this won't be a multiplayer game, Firebase would probably be rather overkill when it comes to storing the data. Instead, I plan to persist the data to local storage. I had originally planned to do this by way of a small library by the name of `redux-localstorage` but David has since convinced me to attempt to do this without relying on an external library as it should be pretty easy to write a JSON string of the current state to local storage.

At this point, world generation is the big tasks I'm attempting to conquer, with multiple possible approaches available to me. Right now I'm mostly leaning towards representing the world as a 2D array which would be a tile map of sorts. The player's current position within the world would be stored as X and Y coordinates, with the options for the player to move in any of the four cardinal directions at any given time. Certain tiles would be marked as blocked during generation, preventing the player from progressing in that direction, and events (most likely represented in JSON files) would be plugged into certain slots and activated when the player reaches them.

Once I have these things down (plus some necessary refactoring since there are a few monolithic functions which would likely be more readable when broken down into bitesize chunks), it will be on to figuring out how combat should work! Plus coming up with a better name of course...
