const canvas = document.getElementById("canvasFill");
const canvas2 = document.getElementById("canvasText");
const ctx = canvas.getContext("2d");
const ctx2 = canvas.getContext("2d");
const score = document.getElementById("score");
const speed = document.getElementById("speed");
const deadS = new Audio('audio/dead.mp3');
const eatS = new Audio('audio/eat.mp3');
const downS = new Audio('audio/down.mp3');
const leftS = new Audio('audio/left.mp3');
const rightS = new Audio('audio/right.mp3');
const upS = new Audio('audio/up.mp3');
const backgroundM = new Audio('audio/backgroundM.mp3');
let count = 0; // count the score
const box = 20;
let snake = [];
let food = {
    x: Math.floor(Math.random() * 39 + 1) * box,
    y: Math.floor(Math.random() * 29 + 1) * box
}

//control the snake direction
let d;
document.addEventListener("keydown",direction);
function direction(event) {
    if(event.keyCode === 37 && d !== "right") {
        d = "left";
        leftS.play();
    }
    else if(event.keyCode === 38 && d !== "down") {
        d = "up";
        upS.play();
    }
    else if(event.keyCode === 39 && d !== "left") {
        d = "right"
        rightS.play();
    }
     else if(event.keyCode === 40 && d !== "up") {
         d = "down"
         downS.play();
    }
}
//style all things
function game() {
    gameSpeed();
    ctx.fillStyle='black'; /*remember to set the background-colro so that the rect can move
    without leaving the old rect trail */
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //style the snake 
    for(let i = 0; i< snake.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    //create food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x,food.y,box,box);
    // old head values
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // move the snake
    if(d === "left") snakeX -= box;
    if(d === "up") snakeY -= box;
    if(d === "right") snakeX += box;
    if(d === "down") snakeY += box;
     /* change the food position instead of popping the snake array, 
        so the snake array can have 1 extra element remain in this if condition*/
    if (snakeX === food.x && snakeY === food.y) {
        food.x = Math.floor(Math.random() * 39 + 1) * box;
        food.y = Math.floor(Math.random() * 29 + 1) * box;
        count += 1;
        score.innerText ="Score: " + count + " / ";
        eatS.play();
    } else {
        //remove the tail
        snake.pop();
    }
        // add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    //check if the head collids the body
    function collision() {
    for(let i = 0; i < snake.length; i++) {
        if(snakeX === snake[i].x && snakeY === snake[i].y) {
            return true;
        } 
    } return false;
    } 
    //end game, check collision and hit wall
    if (collision() || snakeX > 799.9|| snakeX < 0 || snakeY < 0 || snakeY > 599.9) {
        ifGameover = 1;
        clearInterval(Gameinterval);
        deadS.play();
        gameOver();
    backgroundM.pause();
    }
    snake.unshift(newHead);
}

//start menu
function menu() {
    ctx2.textAlign = "center";
    ctx2.fillStyle = "white";
    ctx2.font = "bold 2.5rem Arial";
    ctx2.fillText("Press S Key to Start The Game",400,300);
    ctx2.font = "1.5rem Arial";
    ctx2.fillText("Press P to pause / press C to continue / press R to restart", 400,500)
}
//pause
function pause() {
    ctx2.textAlign = "center";
    ctx2.fillStyle = "white";
    ctx2.font = "bold 3rem Arial";
    ctx2.fillText("Pause",400,200);
    ctx2.font = "2rem Arial";
    ctx2.fillText("press C to continue / press R to restart", 400,400)
}
//gameover
function gameOver() {
    ctx2.textAlign = "center";
    ctx2.fillStyle = "white";
    ctx2.font = "bold 3rem Arial";
    ctx2.fillText("Game Over",400,200);
    ctx2.font = "2rem Arial";
    ctx2.fillText("Your Score = " + count,400,300);
    ctx2.font = "2rem Arial";
    ctx2.fillText("Press S or R to start again!",400,400);
    ifPpressed = 1;
    ifCpressed = 1;
}
//control the game
let ifSpressed = 0;
let ifPpressed = 0;
let ifCpressed = 0;
let ifGameover = 0;
let Gameinterval = 0;
//control the game speed
let s;
function gameSpeed() {
    switch (count) {
        case 0: s = 100;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
        case 10: s = 90;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
        case 20: s = 80;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
        case 30: s = 70;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
        case 40: s = 60;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
        case 50: s = 50;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
        case 60: s = 40;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
        case 70: s = 30;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
        case 80: s = 20;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
        case 90: s = 10;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
        case 100: s = 0;
        clearInterval(Gameinterval);
        Gameinterval = setInterval(game,s);
        break;
    }
    speed.innerText = "Speed: " + s + "/ms";
 }
//menu and start function
menu();
document.addEventListener("keydown", function gameStart(event) {
    if(ifSpressed === 0 && event.keyCode === 83) {
        Gameinterval = 1;
        s = 100;
        count = 0;
        score.innerText ="Score: " + 0 + " / ";
        speed.innerText = "Speed: " + s + "/ms";
        d = null;
        // set the start location of the snake to random
        snake = [];
        snake[0] = {
            x: Math.floor(Math.random() * 39 + 1) * box,
            y: Math.floor(Math.random() * 29 + 1) * box
        }
        food.x = Math.floor(Math.random() * 39 + 1) * box;
        food.y = Math.floor(Math.random() * 29 + 1) * box;
    if(Gameinterval === 1) {
        backgroundM.play();
        Gameinterval = setInterval(game,s);
        ifSpressed = 1; //prevent overpressing S key during the game
        ifPpressed = 0;
        ifCpressed = 0;
    }
}
})
//restart game - during game & pause
document.addEventListener("keydown",function reGam(event) {
    if(event.keyCode === 82) {
        if(ifPpressed === 1) {
            Gameinterval = 0;
            ifGameover = 0;
            ifSpressed = 0;
            ifPpressed = 0;
            ctx2.clearRect(0,0,canvas2.width,canvas2.height);
            menu();
        }
    }
})
//restart game - gameover 
document.addEventListener("keydown", function restartGame(event) {
    if(ifGameover === 1) {
        if(event.keyCode === 82 || event.keyCode === 83) {
            Gameinterval = 0;
            ifGameover = 0;
            ifSpressed = 0;
            ctx2.clearRect(0,0,canvas2.width,canvas2.height);
            menu();
        }
    }
})
//pause game function
document.addEventListener("keydown", function pauseGame(event) {
    if(ifPpressed === 0 && ifSpressed === 1 && event.keyCode === 80) {
        clearInterval(Gameinterval);
        ifPpressed = 1; // prevent overpressing P key during the pause
        ifCpressed = 0;
        backgroundM.pause();
        pause();
    }
})
//continue the game
document.addEventListener("keydown", function pauseGame(event) {
    if(event.keyCode === 67 && ifPpressed === 1 && ifCpressed === 0) {
        backgroundM.play();
        Gameinterval = setInterval(game,s);
        ifPpressed = 0;
        ifCpressed = 1;
    }
})




