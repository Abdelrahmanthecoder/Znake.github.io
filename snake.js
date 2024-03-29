var blockSize = 24;
var rows = 20;
var cols = 25;
var board;
var context; 
var score = 0;

var DeathAudio = new Audio("/DeathAudio.mp3");
var AppleCrunchAudio = new Audio("/AppleCrunchAudio.mp3");
var PopAudio = new Audio("/PopAudio.mp3");

var snakeX = blockSize * 13;
var snakeY = blockSize * 13;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 95/0.76);
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        AppleCrunchAudio.play();
        score += 1;
        console.log(score)
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="purple";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        DeathAudio.play();
        document.getElementById("GameOverScreen").style.visibility = "visible";
        document.getElementById("GameOverScreen1").style.visibility = "visible";
        console.log("'Player' died trying to escape the Znake dungeon!");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            DeathAudio.play();
            document.getElementById("GameOverScreen").style.visibility = "visible";
            document.getElementById("GameOverScreen1").style.visibility = "visible";
            console.log("'Player' died of suffocation!")
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
        console.log("Up Arrow key pressed")
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
        console.log("Down Arrow key pressed")
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
        console.log("Left Arrow key pressed")
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
        console.log("Right Arrow key pressed")
    }
    else if (e.code == "KeyW" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
        console.log("W Key key pressed")
    }
    else if (e.code == "KeyS" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
        console.log("S Key key pressed")
    }
    else if (e.code == "KeyA" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
        console.log("A Key key pressed")
    }
    else if (e.code == "KeyD" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
        console.log("D Key key pressed")
    }
    else if (e.code == "KeyM" && velocityY != 1) {
        PopAudio.play();
        velocityX = 2;
        velocityY = 1;
        console.log("M Key key pressed")
    }
    else if (e.code == "KeyQ" && velocityX != 1) {
        PopAudio.play();
        console.log("Q Key key pressed")
        alert("[Game paused]")
    }
}


function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
