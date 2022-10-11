const canvas = document.getElementById('snake'); 
const ctx = canvas.getContext('2d');


class SnakePart{
    constructor(x, y){
        this.x = x; 
        this.y = y;
    }
}

//snake moving speed
let speed = 5; 


let tileCount = 20 
let tileSize = canvas.width / tileCount - 2;  


let headX = 10
let headY = 10 


const snakeParts = []; 
let tailLength = 2;                 


let appleX = 5;
let appleY = 5;


let xVelocity = 0; 
let yVelocity = 0;

let score = 0; 


// set game loop 
function drawGame(){
    
    changeSnakePosition(); 
    let result = GameOver();
    if(result){ 
        return;
    }
   
    clearScreen();
    
    checkAppleCollision(); 

    drawSnake(); 
    drawApple(); 
    drawScore(); 


    if( score > 6){
        speed = 8
    }
    if(score > 10){
        speed = 11
    }
    if(score > 18){
        speed = 13
    }
    if(score > 25){
        speed = 15
    } 
    if(score > 30) {
        speed = 18
    }
    setTimeout(drawGame, 1000/ speed)
}

//game over
function GameOver(){  
    let gameOver = false;

   
    if(yVelocity === 0 && xVelocity === 0){
    return false;
    }

    // if hit a wall
    if(headX < 0){ 
        gameOver = true;
    }
    else if (headX === tileCount){
        gameOver = true;
    }
    else if(headY < 0){ 
        gameOver = true;
    }
    else if (headY === tileCount){
        gameOver = true;
    }

    // cant eat own body 
    for(let i = 0; i < snakeParts.length; i++ ) { 
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }
    
    if(gameOver){ 
        ctx.fillStyle = "black"
        ctx.font = "20px verdana"
        ctx.fillText("Game Over!", canvas.width / 3, canvas.height / 10) 
        ctx.fillText("ctrl + R !", canvas.width / 2.7, canvas.height / 6)
    }

    return gameOver;

}



function drawScore(){
    ctx.fillStyle = "black";
    ctx.font = "15px verdana" 
    ctx.fillText("score " + score, canvas.width-60, 15) 
}


function clearScreen(){
    
    ctx.fillStyle = "white";                            
    ctx.fillRect(0, 0, canvas.width, canvas.height);    
}


function drawSnake(){
     
   
    ctx.fillStyle = "darkgray";
    for (let i = 0; i < snakeParts.length; i++) { 
        let part = snakeParts[i] 
        
    
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    } 

    
    snakeParts.push(new SnakePart(headX, headY)); 
    while(snakeParts.length > tailLength){ 
        snakeParts.shift();   
    }


  ctx.fillStyle = "black"
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize) // n7oto fl a5er 3shan yb2a el head on the top

}

//color and position of the apple
function drawApple() {
  ctx.fillStyle = "gray"
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

//3shan a8yar mkan el apple kol m el snake tegy 3leha 
function checkAppleCollision(){
    if(appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount)  // a7ot position x aw spot el apple random number w ykon mben el tile count elly howa 20
        appleY = Math.floor(Math.random() * tileCount) // a7ot position y aw spot el apple random number w ykon mben el tile count elly howa 20
        tailLength++; // 3shan 3mlt vailable ll snake tail 
        score++; // 3shan azwed el score by 1
    }

}

// define our change snake position
function changeSnakePosition(){
    headX = headX + xVelocity; // velocity it can be negative num or positive num to move our snake head left or right
    headY = headY + yVelocity;  // for up and down

}

//keyboard arrows
document.body.addEventListener('keydown', keyDown);

function keyDown(event){

    //up arrow
    if(event.keyCode == 38){ //search on goodle for each key word code is

        if(yVelocity == 1) // 3shan gesm el snake lma ados down myro7sh up
            return;

        yVelocity = -1;  // to go up cuz y -1 is up +1 is down
        xVelocity = 0; // stop left and right and only move up

    }

    //down arrow
    if(event.keyCode == 40){ // down arrow key is 40
         if(yVelocity == -1) // 3shan lma ados up myro7sh down
            return;

        yVelocity = 1;
        xVelocity = 0;
    }

    //left arrow 
    if(event.keyCode == 37){
        if(xVelocity == 1) // 3shan lma ados right myro7sh left
            return;

        yVelocity = 0;
        xVelocity = -1;
    }

    //right arrow
    if(event.keyCode ==39){
        if(xVelocity == -1) // 3shan lma ados left myro7sh right
            return;

        yVelocity = 0;
        xVelocity = 1;

    }
}

drawGame();
//three ways that we can do 
//request animation frame
//set interval xtimes per a second which will give afunction and just say continuously call this function every sec
//set time out which only gets called once but then we could call again
