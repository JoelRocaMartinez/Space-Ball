let canvas = document.querySelector("#myCanvas")
canvas.style.backgroundColor = "#0d3440"

let ctx = canvas.getContext("2d");
// to test
let score = 0;
let intervalId = 0;

let isRightArrow = false;
let isLeftArrow = false;
let isUpArrow = false;
let isDownArrow = false;

// Ball 1 variables
let ball1X = 250;
let ball1Y = 250;

let ballRadius = 10;
// Ball 2 variables
let ball2X = 200;
let ball2Y = 200;

// Paddle Bot variables
let paddleBotX = 150
let paddleBotWidth = 200
let paddleBotHeight = 20

//Paddle Side variables
let paddleSideY = 150
let paddleSideWidth = 20
let paddleSideHeight = 200

// Ball 1
function createBall1() {
  ctx.beginPath();
  ctx.fillStyle = "#fffa94"
  ctx.arc(ball1X, ball1Y, ballRadius, 0, Math.PI*2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

// Ball 2
function createBall2() {
  ctx.beginPath();
  ctx.fillStyle = "#fffa94"
  ctx.arc(ball2X, ball2Y, ballRadius, 0, Math.PI*2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}


// Paddle Bot
function createPaddleBot() {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(paddleBotX, (canvas.height - paddleBotHeight) - 10, paddleBotWidth, paddleBotHeight);
  ctx.closePath();
}

// Paddle Side
function createPaddleSide() {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect((canvas.width - paddleSideWidth) -10, paddleSideY, paddleSideWidth, paddleSideHeight);
  ctx.closePath();
}


document.addEventListener('keydown', function(event){
  if (event.key === 'ArrowRight') {
      isRightArrow = true;
      isLeftArrow = false
  } 
  else if (event.key === 'ArrowLeft') {
      isLeftArrow = true; 
      isRightArrow = false;
  }
  if (event.key === 'ArrowUp') {
    isUpArrow = true;
    isDownArrow = false
  } 
  else if (event.key === 'ArrowDown') {
    isDownArrow = true; 
    isUpArrow = false;
  }

})

document.addEventListener('keyup', function(event){
  isRightArrow = false;
  isLeftArrow = false;
  isUpArrow = false;
  isDownArrow = false;
})

// Paddle movement
function paddleMovement() {
  if (isRightArrow && paddleBotX < canvas.width - paddleBotWidth) {
      paddleBotX = paddleBotX + 10
  }
  else if (isLeftArrow && paddleBotX > 0) {
      paddleBotX = paddleBotX - 10
  }
  if (isUpArrow && paddleSideY > 0) {
    paddleSideY = paddleSideY - 10
}
else if (isDownArrow && paddleSideY < canvas.height - paddleSideHeight) {
    paddleSideY = paddleSideY + 10
}

}






// Print Score
function printScore(){
    ctx.font = '18px Verdana'
    ctx.fillText('Score: '+ score, 10, 20)
}




function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  createBall1()
  createBall2()
  createPaddleBot()
  createPaddleSide()
  paddleMovement()
  printScore()
}

intervalId = setInterval(() => {
  requestAnimationFrame(game)
}, 20)

