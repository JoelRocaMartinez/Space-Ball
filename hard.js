let canvas = document.querySelector("#myCanvas")
canvas.style.backgroundColor = "#0d3440"

let ctx = canvas.getContext("2d");

let score = 0;
let intervalId = 0;

let isRightArrow = false;
let isLeftArrow = false;
let isUpArrow = false;
let isDownArrow = false;

let ball1Xincrement = 7
let ball1Ydecrement = - 7

let ball2Xdecrement = - 7
let ball2Yincrement = 7

// Ball 1 variables
let ball1X = 70;
let ball1Y = 70;

let ballRadius = 10;

// Ball 2 variables
let ball2X = 200;
let ball2Y = 200;

// Paddle Bot variables
let paddleBotX = 200;
let paddleBotWidth = 100;
let paddleBotHeight = 20;

//Paddle Side variables
let paddleSideY = 200;
let paddleSideWidth = 20;
let paddleSideHeight = 100;

// Ball 1
function createBall1() {
  ctx.beginPath();
  ctx.fillStyle = "#fffa94"
  ctx.arc(ball1X, ball1Y, ballRadius, 0, Math.PI*2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};

// Ball 2
function createBall2() {
  ctx.beginPath();
  ctx.fillStyle = "#fffa94"
  ctx.arc(ball2X, ball2Y, ballRadius, 0, Math.PI*2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};


// Paddle Bot
function createPaddleBot() {
  ctx.beginPath();
  ctx.fillStyle = "#c7c7c7";
  ctx.fillRect(paddleBotX, (canvas.height - paddleBotHeight) - 10, paddleBotWidth, paddleBotHeight);
  ctx.closePath();
};

// Paddle Side
function createPaddleSide() {
  ctx.beginPath();
  ctx.fillStyle = "#c7c7c7";
  ctx.fillRect((canvas.width - paddleSideWidth) -10, paddleSideY, paddleSideWidth, paddleSideHeight);
  ctx.closePath();
};


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

});

document.addEventListener('keyup', function(event){
  isRightArrow = false;
  isLeftArrow = false;
  isUpArrow = false;
  isDownArrow = false;
});


// Paddle movement
function paddleMovement() {
  if (isRightArrow && paddleBotX < canvas.width - paddleBotWidth) {
      paddleBotX = paddleBotX + 20
  }
  else if (isLeftArrow && paddleBotX > 0) {
      paddleBotX = paddleBotX - 20
  }
  if (isUpArrow && paddleSideY > 0) {
    paddleSideY = paddleSideY - 20
  }
else if (isDownArrow && paddleSideY < canvas.height - paddleSideHeight) {
    paddleSideY = paddleSideY + 20
  }
};


// Ball 1 movement
function ball1Movement() {
  ball1X += ball1Xincrement
  ball1Y += ball1Ydecrement
}

// Ball 2 movement
function ball2Movement() {
  ball2X += ball2Xdecrement
  ball2Y += ball2Yincrement
}

// Ball 1 Collision
function ball1Collision() {
  if (ball1Y - ballRadius < 0) {
    ball1Ydecrement = 7
  } else if (ball1X > canvas.width - paddleSideWidth - 10 - ballRadius) {
    if (ball1Y > paddleSideY && ball1Y < paddleSideY + paddleSideHeight) {
      ball1Xincrement = - 7
      score += 10
    } 
  } else if (ball1Y > canvas.height - paddleBotHeight - 10 - ballRadius) {
    if (ball1X > paddleBotX && ball1X < paddleBotX + paddleBotWidth) {
      ball1Ydecrement = - 7
      score += 10
    } 
  } else if (ball1X - ballRadius < 0) {
    ball1Xincrement = 7
  }
}

// Ball 2 Collision
function ball2Collision() {
  if (ball2X - ballRadius < 0) {
    ball2Xdecrement = 7
  } else if (ball2Y > canvas.height - paddleBotHeight - 10 - ballRadius) {
    if (ball2X > paddleBotX && ball2X < paddleBotX + paddleBotWidth) {
      ball2Yincrement = - 7
      score += 10
    } 
  } else if (ball2X > canvas.width - paddleSideWidth - 10 - ballRadius) {
    if (ball2Y > paddleSideY && ball2Y < paddleSideY + paddleSideHeight) {
      ball2Xdecrement = - 7
      score += 10
    } 
  } else if (ball2Y - ballRadius < 0) {
    ball2Yincrement = 7
  }
}



// Print Score
function printScore(){
    ctx.font = '18px monospace';
    ctx.fillStyle = "white";
    ctx.fillText('Score: '+ score, 10, 20);
}






function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  createBall1()
  createBall2()
  createPaddleBot()
  createPaddleSide()
  paddleMovement()
  printScore()
  ball1Movement()
  ball2Movement()
  ball1Collision()
  ball2Collision()
}

intervalId = setInterval(() => {
  requestAnimationFrame(game)
}, 20);



document.querySelector("#hard").addEventListener("click", game)
