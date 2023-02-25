# Pac-Man
## Team Name: WRLDMDE
-Trevon (Project Manager)
*Julian
+Daniel
### User Story / Gameplay
Describe the gameplay
	The player controls Pac-Man and must eat all dots inside of an enclosed maze, while avoiding all the ghosts in the maze. 
What are the conditions when the game begins?
All ghosts are contained in one area
Pac Man starts at a random location on maze
Dots scattered all over traversable maze
Score display starts at 0 
Power ups(power pellets) located at 4 corners on the map
Does the game have an end? If so, what are the conditions for when it ends?
Pac Man must consume all dots for each level (evaluate score of all dots set it equal to such) 
### Visual Game Components:
A description of the visual game components
What are the visual game components? Which are static and which are animated?
Pac-Man (dynamic)
Ghosts (dynamic)
Maze (static)
Pellets (dynamic)
Power pellets (dynamic)
Score display (dynamic)
Level display & difficulty(static)
### Data:
The major data values used in the game
What data will you need to track for each game component?
What data will you need to track for the entire game?
Level Layout (2D array)
Pac man location (row, column)
Pac Man width, height
Pac Man can only travel on maze(collisions)
Pac Man lives
Pac Man speed 
Pac Man directions
Ghosts width, height
Ghost directions 
Ghosts speed
Pellets widths and heights
Power pellets widths and height
Score counter display 
### Events / Logic:
High level descriptions of the user events and timer logic
What events will occur in this game? (timer events, keyboard events, clicking events?)
How do those events affect the data of the program?
For each "event", write out the high-level logic of what will happen. It is better (and tricky) to be as specific as you can while remaining high-level!
Keyboard events:
Control pacman's direction
On each frame:
Move pacman
Move ghosts
If Pac-man is caught by a ghost, he loses a life (decrement lives)
If Pac-man eats a pellet, increase score by 10 points (increment score count)
If Pac-man eats a green power pellet, adds a life to the bar (increment lives)
If Pac-man eats a blue power pellet, apply a speed boost to the Pac-Man/ give Pac Man an attacking ability.
If Pac-man eats a rainbow power pellet, grant invincibility for 10 seconds
If Pac-man eats a red power-pellet, change color of ghosts, allow Pac Man to eat them and sends the ghost back to the starting position, slows down ghost after coming out of the starting position
If Pac Man eats all pellets, move on to the next stage(resets, with a slightly harder difficulty each time)
Once on the final stage Pac Man is able to eat all pellets, declaring the player as the winner.
### Advanced Features:
A list of advanced features
What features will your group build out once you complete your main user stories and core game play?
Music?
Customized sprites (requirements for dimensions) 
Power ups(more health, attacking ghosts)
Selector for themes(changing colors)
3 levels, easy, medium, hard (adding an extra ghost) 
Using an API that uses facial recognition to swap users face sprite 
Camera access, with a facial recognition API that turns face pictures into your sprites. Ghost sprites, eyes move side to side. Pacman mouth opens on animation
Uses a mouse to control the direction of Pac Man?
A Pac Man power up turns the game into a game of snake as well
Portals
### Elements:
Negative power up, reverses control 
(Optional) External libraries
Is you group using a JS library? If so, which one?
Potentially Kaboom
onCollide()method and destroy()method along with defining area() on a sprite seems to efficiently solve the problem with collisions.
solid() creates 
add()- helps add components such as sprites to the game, along with other methods such as area() that'll define the area of a given sprite(useful for collisions), pos(), that defines a starting position of the sprite and allows movement
onKeyDown() - controls the movement of a sprite given 
camPos()- keeps the camera on player position if play position is passed as an argument to the method


### MVP:
Render a maze
Render Pacman
Move pacman within the maze such that pacman can't go through walls

Part 2:
Render pellets
Pacman can eat pellets
Score display

Part 3:
Render ghosts
Move ghosts with AI
Ghost collisions

Part 4:
Bonus stuff
