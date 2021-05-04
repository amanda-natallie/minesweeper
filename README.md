# MineSweeper with React.JS and REDUX

Welcome to my personal Minesweeper made with typescript and react. 

It's made with [React95](https://react95.io/) storybook lib, \
Using Hooks to optimize the react lifecycle;\
Managing store with Redux;\
Styled Components customizing wrappers and positions;\
Prettier & EsLint working together to a better code look;


## The folder structure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
the folders inside ```src``` 

```
 src
    ├── components            # Game components, such as CloseButton, FeedbackModal, etc
    ├── constants             # Fixed variables of the game, such as max_rows, max_column and number_of_bombs
    ├── helpers               # helper functions to gather adjacent tiles and generate cells
    ├── store                 # Redux store. contains the Game and Modal modules
 ```

## The code

on ```src/components/GameWindow``` there is three useEffects that watches global behaviors such ```isGameStarted```, ```isGameOver``` and ```isGameWon```\
Also it has a ```showAllBombs()``` method when the game is over. 
Finally, a ```renderTiles()``` method to show all cells on screen.

Inside the ```renderTiles()``` method, there is another component named ```<TileButton />``` which carries all onClick logic for this game. 

Inside the ```TileButton/>``` component, there is local states to manage the flagged state and if it's open.
Also it has handlers to take care of the mouse's right click and left click, useEffect watchers to handle changes when the tile isOpen.
In the  left click's handle callBack, it is also spreading the empty cells when clicked. 
Finally, a last method to render the text of the current tile.

## Some features

- The whole applications looks like the old Windows 95 UI.
- The user will not start clicking on a bomb, never.
- The user can't set flags before the game is started.
- The counter on top stops when game is won/lost and it resets when clicking on reset button.


## Running the project

Install dependencies and run the project in one command: 

### `yarn && yarn start`


