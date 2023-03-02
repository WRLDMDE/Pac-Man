const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animation1");
const pacmanFrames2 = document.getElementById("animation2");
const ghostFrames = document.getElementById("ghosts");
const gameOverScreen = document.getElementById("gameOverScreen");
const winScreen = document.getElementById("winScreen");
const scoreDisplay = document.getElementById("scoredisplay")

let createRect = (x, y, width, height, color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
};

let createRectR = (x, y, width, height, color) => {
  var bgcolorlist=new Array( "#33FFBD","#C9FFA8", )
 
  function changeColor() { // Define a function that changes the color of the rectangle
  canvasContext.fillStyle = bgcolorlist[Math.floor(Math.random() * bgcolorlist.length)];
  canvasContext.fillRect(x, y, width, height);
  }
    // Call the changeColor function every 5 seconds using setInterval
   changeColor()
};
const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;
let lives = 3;
let foodCount = 4250;
let ghostCount = 4;
let ghostImageLocations = [
  { x: 0, y: 0 },
  { x: 176, y: 0 },
  { x: 0, y: 121 },
  { x: 176, y: 121 },
];

// Game variables
let fps = 30;
let pacman1;
let pacman2;
let oneBlockSize = 20;
let score = 0;
let ghosts = [];
let wallSpaceWidth = oneBlockSize / 1.6;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "#85017f";

// MAP //
// This is used to create the map of the walls.
// We use 1 for a wall frame , 0 if we don't want a wall, and 2 for our pellets that PacMan will collect.
 // 9 is for the power pellets that PacMan will eat.
// 21 COLUMNS // 23 ROWS //

let map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 1, 9, 1, 0, 0, 0, 0, 0, 1, 9, 1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 1, 1, 9, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 9, 1, 1, 2, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0, 0, 0],
  [0, 0, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1, 9, 1, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 0, 0],
  [0, 0, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 0, 0],
  [0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 0],
  [0, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 0],
  [1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1],
  [9, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 9],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1],
  [0, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 1, 0],
  [0, 1, 2, 1, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 1, 0],
  [0, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 1, 2, 9, 2, 2, 2, 2, 2, 2, 2, 9, 2, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 0],
  [0, 0, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 0, 0],
  [0, 0, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 0, 0],
  [0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 9, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 9, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 2, 2, 2, 1, 9, 1, 2, 2, 2, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 9, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

//points to win is 421

let randomTargetsForGhosts = [
  { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
  { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
  { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
  {
    x: (map[0].length - 2) * oneBlockSize,
    y: (map.length - 2) * oneBlockSize,
  },
];



let createNewPacman = () => {
  pacman1 = new Pacman(
    oneBlockSize * 7,
    oneBlockSize * 3,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize / 5 
  );
  pacman2 = new Pacman(
    oneBlockSize * 27,
    oneBlockSize * 3,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize / 5 
  );
};

let gameLoop = () => {
  draw();
  update();
  drawPower();
};

let gameInterval = setInterval(gameLoop, 1000 / fps);

let restartPacmanAndGhosts = () => {
  createNewPacman();
  createGhosts();
};

let onGhostCollisionPac = () => { //ghost only follows pacman
  lives--;
  restartPacmanAndGhosts();
  if (lives == 0) {
    gameOver();
  }
};

let onGhostCollisionMs = () => {//but if ms pacman dies once its game over
  lives = 0;
  restartPacmanAndGhosts();
  gameOver();
  // if (lives == 0) {
  // }
};

let update = () => {
  pacman1.moveProcess();
  pacman1.eat();
  updateGhosts();
  pacman1.teleport();
  if (pacman1.checkGhostCollision(ghosts)) {
    onGhostCollisionPac();
    restartGame();
  }
  pacman2.moveProcess();
  pacman2.eat();
  pacman2.teleport();
  updateGhosts();
  if (pacman2.checkGhostCollision(ghosts)) {
    onGhostCollisionMs();
    restartGame();
  }
  if(score * 10 >= foodCount){
    drawWin();
    //clear Interval is what stops everyhing from running
    clearInterval(gameInterval);
    //new Audio("../sounds/gameWin.wav").play(); //play sound when win
    //should move onto next level instead
}
};

//resetting the game - %
let restartGame = () => {
  createNewPacman();
  createGhosts();
  // lives -=1 ;
  //creates a condition stating if lives get to 0, invoke gameOver() method
  if(lives === 0){
      gameOver();
  }
};

// %
let gameOver = () => {
  // drawRemainingLives();
  drawGameOver();
  //clear interval stops everything from running 
  clearInterval(gameInterval);
  scoreDisplay.textContent = `Score ${(score * 10)-10}`;
  new Audio("../sounds/gameOver.wav").play();//play the game over sound
}

//create display for losing game -%
let drawGameOver = () => {
  //canvas content is used for drawing onto a canvas
  // canvasContext.font = "20px Emulogic";
  // canvasContext.fillStyle = "white";
  // canvasContext.fillText("Game Over", 150, 200);
  //create a replay button along with an event handler that will restart game
  gameOverScreen.style.display = 'flex'; 
}

//create display for win -%
let drawWin = () => {
  // canvasContext.font = "20px Emulogic";
  // canvasContext.fillStyle = "white";
  // canvasContext.fillText("You Win!", 150, 200);
  winScreen.style.display = 'flex';
   new Audio("../sounds/gameWin.wav").play(); //play sound when win
}
//create a gameWin function that checks to see if all pellets are eaten 


let drawFoods = () => {
  //what does i keep track of and what does j keep track of within the map matrix
  for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
          //2 within the tilemap is labeled as the open space
          if (map[i][j] == 2) {
              //renders a rectangle from the canvas 2D API
              createRect(
                  j * oneBlockSize + oneBlockSize / 3, //x position
                  i * oneBlockSize + oneBlockSize / 3, //y position
                  oneBlockSize / 3,//width
                  oneBlockSize / 3,//height
                   "#FEB897" //color
                  //"#01FFF4" 
              );
          //need to target all positions except for where the ghosts are
          //indices include the 200th index, 220-222th index, 241th index-242th index) might be one less 
          }
      }
  }
};

let drawPower = () => { //Used for creating power pellets
  for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length;j++) {
          //9 within the tilemap is labeled as the open space
          if (map[i][j] == 9) {
              //renders a rectangle from the canvas 2D API
              createRectR(
                  j * oneBlockSize + oneBlockSize / 3,//x position
                  i * oneBlockSize + oneBlockSize / 3,//y position
                  oneBlockSize / 3,//width
                  oneBlockSize / 3,//height
              );
          }
      }
  }
};

let drawRemainingLives = () => {
  canvasContext.font = "20px Emulogic";
  canvasContext.fillStyle = "white";
  canvasContext.fillText("Lives: ", 220, oneBlockSize * (map.length + 1));

  for (let i = 0; i < lives; i++) {
    //method used to create images
    canvasContext.drawImage(
        pacmanFrames,//img
        2 *oneBlockSize,//sx
        0,//sy
        oneBlockSize, //sWidth
        oneBlockSize, //sHeight
        300 + i * oneBlockSize, //dx
        oneBlockSize * map.length + 15,//dy
        oneBlockSize,//dWidth 
        oneBlockSize//dHeight
    );
}
};

let drawScore = () => {
  canvasContext.font = "20px Emulogic";
  canvasContext.fillStyle = "white";
  canvasContext.fillText(
      "Score: " + score * 10,//the text
      oneBlockSize,//x 
     (oneBlockSize) * (map.length + 1)//y, added .5 to align with Lives display
  );
};

let draw = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  createRect(0, 0, canvas.width, canvas.height, "#51005c");
  drawWalls();
  drawFoods();
  drawGhosts();
  pacman1.draw(pacmanFrames);
  pacman2.draw(pacmanFrames2);
  drawScore();
  drawRemainingLives();
};

let drawWalls = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 1) {
        createRect(
          j * oneBlockSize,
          i * oneBlockSize,
          oneBlockSize,
          oneBlockSize,
          "#cf30bb"
        );
        if (j > 0 && map[i][j - 1] == 1) {
          createRect(
            j * oneBlockSize,
            i * oneBlockSize + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            wallInnerColor
          );
        }

        if (j < map[0].length - 1 && map[i][j + 1] == 1) {
          createRect(
            j * oneBlockSize + wallOffset,
            i * oneBlockSize + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            wallInnerColor
          );
        }

        if (i < map.length - 1 && map[i + 1][j] == 1) {
          createRect(
            j * oneBlockSize + wallOffset,
            i * oneBlockSize + wallOffset,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            wallInnerColor
          );
        }

        if (i > 0 && map[i - 1][j] == 1) {
          createRect(
            j * oneBlockSize + wallOffset,
            i * oneBlockSize,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            wallInnerColor
          );
        }
      }
    }
  }
};

let createGhosts = () => {
  ghosts = [];
  for (let i = 0; i < ghostCount * 2; i++) {
    let newGhost = new Ghost(
      16 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
      14 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
      oneBlockSize,
      oneBlockSize,
      pacman1.speed / 4,
      ghostImageLocations[i % 4].x,
      ghostImageLocations[i % 4].y,
      124,
      116,
      10 + i
    );
    ghosts.push(newGhost);
  }
};

createNewPacman();
createGhosts();
gameLoop();

let image2 = document.querySelector('body > div:nth-child(5) > img');
let image = document.querySelector('body > div:nth-child(5) > img:nth-child(2)');


window.addEventListener("keydown", (event) => {
  let k = event.keyCode;
  setTimeout(() => {
    if (k == 37) {
      // left arrow or a
      pacman2.nextDirection = DIRECTION_LEFT;
      image.src = './experiment/leftstick (2).png'
    } else if (k == 38) {
      // up arrow or w
      pacman2.nextDirection = DIRECTION_UP;
      image.src = './experiment/topstick (2).png'
    } else if (k == 39) {
      // right arrow or d
      pacman2.nextDirection = DIRECTION_RIGHT;
      image.src = './experiment/rightstick (2).png'
    } else if (k == 40) {
      // bottom arrow or s
      pacman2.nextDirection = DIRECTION_BOTTOM;
      image.src = './experiment/bottomstick (2).png'
    }
    
  }, 1);
});

window.addEventListener("keyup", (event) => {
  let k = event.keyCode;
  setTimeout(() => {
    if (k == 37) {
      // left arrow or a
      image.src = './experiment/middlestick (2).png'
    } else if (k == 38) {
      // up arrow or w
      image.src = './experiment/middlestick (2).png'
    } else if (k == 39) {
      // right arrow or d
      image.src = './experiment/middlestick (2).png'
    } else if (k == 40) {
      // bottom arrow or s
      image.src = './experiment/middlestick (2).png'
    }
    
  }, 1);
});

window.addEventListener("keydown", (event) => {
  let k = event.keyCode;
  setTimeout(() => {
    if (k == 65) {
      // left arrow or a
      pacman1.nextDirection = DIRECTION_LEFT;
      image2.src = './experiment/leftstick.png'
    } else if (k == 87) {
      // up arrow or w
      pacman1.nextDirection = DIRECTION_UP;
      image2.src = './experiment/topstick.png'
    } else if (k == 68) {
      // right arrow or d
      pacman1.nextDirection = DIRECTION_RIGHT;
      image2.src = './experiment/rightstick.png'
    } else if (k == 83) {
      // bottom arrow or s
      pacman1.nextDirection = DIRECTION_BOTTOM;
      image2.src = './experiment/bottomstick.png'
    }
    
  }, 1);
});

window.addEventListener("keyup", (event) => {
  let k = event.keyCode;
  setTimeout(() => {
    if (k == 65) {
      // left arrow or a
      image2.src = './experiment/middlestick.png'
    } else if (k == 87) {
      // up arrow or w
      image2.src = './experiment/middlestick.png'
    } else if (k == 68) {
      // right arrow or d
      image2.src = './experiment/middlestick.png'
    } else if (k == 83) {
      // bottom arrow or s
      image2.src = './experiment/middlestick.png'
    }
    
  }, 1);
});

// let newImage = new Image();
// newImage.src = 'https://fjolt.com/images/misc/202203281.png'

// // When it loads
// newImage.onload = (event) => {
//     // Draw the image onto the context
//     //ctx.drawImage(image, x, y, width, height)
//     event.preventDefault();
//     canvasContext.drawImage(newImage, -100, 500, 250, 208);

// }

// var update = true; // if true redraw
// function renderFunction(){
//     if(update){  // only raw if needed
//        update = false;
//        canvasContext.drawImage(newImage, 0, 0, canvas.width, canvas.height);

//     }
//     requestAnimationFrame(renderFunction);
// }
// requestAnimationFrame(renderFunction);