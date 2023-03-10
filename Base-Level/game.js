const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animation");
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
let foodCount = 2140;
let ghostCount = 2;
let ghostImageLocations = [
    { x: 0, y: 0 },
    { x: 176, y: 0 },
    { x: 0, y: 121 },
    { x: 176, y: 121 },
];

// Game variables
let fps = 30;
let pacman;
let oneBlockSize = 20;
let score = 0;
let ghosts = [];
let wallSpaceWidth = oneBlockSize / 1.6;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";

// MAP // 
// This is used to create the map of the walls.
 // We use 1 for a wall frame , 0 if we don't want a wall, and 2 for our pellets that PacMan will collect.
 // 9 is for the power pellets that PacMan will eat.
 // 21 COLUMNS // 23 ROWS //

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 9, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 9, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 9, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let randomTargetsForGhosts = [
    { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
    { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
    {
        x: (map[0].length - 2) * oneBlockSize,
        y: (map.length - 2) * oneBlockSize,
    },
];

// for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[0].length; j++) {
//         map[i][j] = 2;
//     }
// }

let createNewPacman = () => {
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
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

let onGhostCollision = () => {
    lives--;
    restartPacmanAndGhosts();
    if (lives == 0) {
        gameOver();
    
    }
};

let update = () => {
    
    pacman.moveProcess();
    pacman.eat();
    updateGhosts();
    pacman.teleport();
    if (pacman.checkGhostCollision(ghosts)) {
        onGhostCollision();
        restartGame();
    }

    if(score * 10 >= foodCount){
        drawWin();
        //clear interval stops everything from ruuning
        clearInterval(gameInterval)
       // scoreDisplay.textContent = `Score ${(score *10)}`;
        new Audio("../sounds/gameWin.wav").play(); //play sound when win
        //should move into the next level
    }

};

//resetting the game 

let restartGame = () => {
    createNewPacman();
    createGhosts();
}

let gameOver = () => {
    drawGameOver();
    //clear interval stops everything from running
    clearInterval(gameInterval);
    scoreDisplay.textContent = `Score ${(score *10)}`;
    new Audio("../sounds/gameOver.wav").play();//play the game over sound
    
}

let drawGameOver = () => {
    gameOverScreen.style.display = 'flex';

}

//create display for win -%
let drawWin = () => {
    // scoreDisplay.textContent = `Score ${(score *10)}`;
    winScreen.style.display = 'flex';
}

let drawFoods = () => { //used for creating pellets
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            //2 within the tilemap is labeled as the open space
            if (map[i][j] == 2) {
                //renders a rectangle from the canvas 2D API
                createRect(
                    j * oneBlockSize + oneBlockSize / 3,//x position
                    i * oneBlockSize + oneBlockSize / 3,//y position
                    oneBlockSize / 3,//width
                    oneBlockSize / 3,//height
                    "#FEB897"//color
                     //"#01FFF4"
                );
            }
        }
    }
};

let drawPower = () => { //Used for creating power pellets

   
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length;j++) {
            //9 within the tilemap is labeled as the power pellets
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
            2 * oneBlockSize,//sx
            0,//sy
            oneBlockSize,//sWidth
            oneBlockSize,//sHeight
            280 + i * oneBlockSize,//dx - switch 350 to 280
            oneBlockSize * map.length + 2,//dy
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
        0,//x
        oneBlockSize * (map.length + 1)//y
    );
};

//putting all visual elements on the display
let draw = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    createRect(0, 0, canvas.width, canvas.height, "black");
    drawWalls();
    drawFoods();
    drawGhosts();
    pacman.draw();
    drawScore();
    drawRemainingLives();
};

let drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 1) {
                createRect(
                    j * oneBlockSize,//x
                    i * oneBlockSize,//y
                    oneBlockSize,//width
                    oneBlockSize,//height
                    "#342DCA"//original color- blue
                    //"#39FF14"//changing theme color for walls to neon green
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
            9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            pacman.speed / 2,
            ghostImageLocations[i % 4].x,
            ghostImageLocations[i % 4].y,
            124,
            116,
            6 + i
        );
        ghosts.push(newGhost);
    }
};

createNewPacman();
createGhosts();
gameLoop();

let image = document.querySelector('#leftJoy > img');
let left2 = document.querySelector('#leftJoy')


window.addEventListener("keydown", (event) => {
    let k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            // left arrow or a
            pacman.nextDirection = DIRECTION_LEFT;
            image.src = './../Love-Level/experiment/leftstick.png'
            left2.style.left = "40px"
            left2.style.top = "340px"
        } else if (k == 38 || k == 87) {
            // up arrow or w
            pacman.nextDirection = DIRECTION_UP;
            image.src = './../Love-Level/experiment/topstick.png'
            left2.style.top = "270px"
        } else if (k == 39 || k == 68) {
            // right arrow or d
            pacman.nextDirection = DIRECTION_RIGHT;
            image.src = './../Love-Level/experiment/rightstick.png'
            left2.style.left = "150px"
            left2.style.top = "340px"
        } else if (k == 40 || k == 83) {
            // bottom arrow or s
            pacman.nextDirection = DIRECTION_BOTTOM;
            image.src = './../Love-Level/experiment/bottomstick.png'
            left2.style.top = "330px"
        }
    }, 1);
});

window.addEventListener("keyup", (event) => {
    let k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            // left arrow or a
            image.src = './../Love-Level/experiment/middlestick.png'
            left2.style.left = "120px"
            left2.style.top = "300px"
        } else if (k == 38 || k == 87) {
            // up arrow or w
            image.src = './../Love-Level/experiment/middlestick.png'
            left2.style.top = "300px"
        } else if (k == 39 || k == 68) {
            // right arrow or d
            image.src = './../Love-Level/experiment/middlestick.png'
            left2.style.left = "120px"
            left2.style.top = "300px"
        } else if (k == 40 || k == 83) {
            // bottom arrow or s
            image.src = './../Love-Level/experiment/middlestick.png'
            left2.style.top = "300px"
        }
    }, 1);
});

