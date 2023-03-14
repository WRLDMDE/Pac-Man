# Pac-Man++
## Team Name: WRLDMDE
- Trevon Charles (Project Manager)
* Julian Castro 
+ Daniel Nelson
### User Story / Gameplay
![My Image](/home/treyjaded/Development/unit-5/Pac-Man/sounds/readMePhotos/Screenshot 2023-03-13 at 2.26.56 PM.png)

The player controls Pac-Man and must eat all dots inside of an enclosed maze, while avoiding all the ghosts in the maze. 

All ghosts are contained in one area, with Pac Man starting at a random location on the maze.

Dots are scattered all over traversable maze and the Score display starts at 0.

Power ups(power pellets) are located at 4 corners on the map
![alt text](http://url/to/img.png)
**Does the game have an end? If so, what are the conditions for when it ends?**

Pac Man must consume all dots for each level (evaluate score of all dots set it equal to such) 

### Visual Game Components:
**What are the visual game components? Which are static and which are animated?**

- Pac-Man (dynamic)
* Ghosts (dynamic)
+ Maze (static)
- Pellets (dynamic)
* Power pellets (dynamic)
+ Score display (dynamic)
- Level display & difficulty(static)
### Data:

**What data will you need to track for each game component?
What data will you need to track for the entire game?**

- Level Layout (2D array)
* Pac man location (row, column)
+ Pac Man width, height
- Pac Man can only travel on maze(collisions)
* Pac Man lives
+ Pac Man speed 
- Pac Man directions
* Ghosts width, height
+ Ghost directions 
- Ghosts speed
* Pellets widths and heights
+ Power pellets widths and height
- Score counter display 

### Events / Logic:

**What events will occur in this game? (timer events, keyboard events, clicking events?)
How do those events affect the data of the program?**

**Keyboard events:**
Control pacman's direction

**On each frame:**

- Move pacman
* Move ghosts
+ If Pac-man is caught by a ghost, he loses a life (decrement lives)
- If Pac-man eats a pellet, increase score by 10 points (increment score count)
* If Pac-man eats a green power pellet, adds a life to the bar (increment lives)
+ If Pac-man eats a blue power pellet, apply a speed boost to the Pac-Man/ give Pac Man an attacking ability.
- If Pac-man eats a rainbow power pellet, grant invincibility for 10 seconds
* If Pac-man eats a red power-pellet, change color of ghosts, allow Pac Man to eat them and sends the ghost back to the starting position, slows down ghost after coming out of the starting position
+ If Pac Man eats all pellets, move on to the next stage(resets, with a slightly harder difficulty each time)
- Once on the final stage Pac Man is able to eat all pellets, declaring the player as the winner.

### Advanced Features:

- Music
* Customized sprites (requirements for dimensions) 
+ Power ups(more health, attacking ghosts)
- Selector for themes(changing colors)
* 2 levels, Vanilla & Mutiplayer Level
+ A Pac Man power up turns the game into a game of snake as well
- Portals

### Elements:
- Negative power up, reverses control 
* (Optional) External libraries

