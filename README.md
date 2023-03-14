# Pac-Man++
## Team Name: WRLDMDE
- Trevon Charles (Project Manager)
* Julian Castro 
+ Daniel Nelson
### Main Menu

<img width="1728" alt="Main Menu" src="https://user-images.githubusercontent.com/114108168/225054657-1e1252c3-9536-4698-bff7-6f717354ee80.png">

The player controls Pac-Man and must eat all dots inside of an enclosed maze, while avoiding all the ghosts in the maze. 

All ghosts are contained in one area, with Pac Man starting at a random location on the maze.

Dots are scattered all over traversable maze and the Score display starts at 0.

Power ups(power pellets) are located at 4 corners on the map

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
<img width="1728" alt="Vanilla Level" src="https://user-images.githubusercontent.com/114108168/225055108-bc79b4b9-c2fe-4e1c-b5dd-3696bafb9b28.png">

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
<img width="1728" alt="Win Screen" src="https://user-images.githubusercontent.com/114108168/225055526-2c4a096e-9569-4e99-b45a-f27b7e0cd0bb.png">

### Events / Logic:

**Keyboard events:**
Control pacman's direction

**On each frame:**
<img width="1728" alt="Lose Screen" src="https://user-images.githubusercontent.com/114108168/225055831-70ee1e83-371d-4e6c-a98e-8aaa462eaa32.png">
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
<img width="1728" alt="Love Level" src="https://user-images.githubusercontent.com/114108168/225055956-f7584dd7-88c6-4005-9eb4-77d7886feb11.png">

### Elements:
- Negative power up, reverses control 
