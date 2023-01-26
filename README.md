# Black Forest

## Description
Black Forest is a simple game and includes one type of woman character. She can move along the game board and try to collect food (a slice of pie) in order to get points. She needs to be careful about the ghosts falling down. Once she hits/touches one of the ghosts, the game is over.


## MVP
- Game includes one woman character,
- She can move right, left, up and down with the help of arrows on the keyboard,
- There are ghosts falling down randomly. If she touches one of the ghosts, the game is over,
- There are foods appearing randomly. Whenever they are collected, the score increases.
- There is a score counter on the right top corner of the game board.


## Backlog
- Add audios,


## Data structure (index.js)
- init() - initial values (designed especialy for re-start)
- a class for Resource - designed for foods (for now it is only pie) - includes functions below;
drawResource()
pickUpResource()
- a class for Ghost - includes functions below;
draw()
checkCollision()
- animate () - this animates the game
- eventListeners


## States y States Transitions
- Game-Intro
- Game-Board
- Game-Over 


## Task
?


## Links

- [Trello Link](https://trello.com/b/7mV04nrw/black-forest)
- [Slides Link](https://github.com/DenizAlakavuklar/Black-Forest/blob/1f6e2cd1638bbbad20518d06dd661aa8dd9656a4/Black%20Forest%20Presentation.key)
- [Github repository Link](https://github.com/DenizAlakavuklar/Black-Forest.git)
- [Deployment Link](https://denizalakavuklar.github.io/Black-Forest/)