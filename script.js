let ctx;
let canvas;

let score = 0;
let intervalId = 0;

let bounce;

let isRightArrow = false;
let isLeftArrow = false;
let isUpArrow = false;
let isDownArrow = false;

let speed = 0;
let width;

let dir1X = 1
let dir1Y = -1

let dir2X = -1
let dir2Y = 1


let audioElement = new Audio('bounce_effect.mp3');



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
  ctx.fillStyle = "#8A8A8A";
  ctx.fillRect(paddleBotX, (canvas.height - paddleBotHeight) - 10, paddleBotWidth, paddleBotHeight);
  ctx.closePath();
};

// Paddle Side
function createPaddleSide() {
  ctx.beginPath();
  ctx.fillStyle = "#8A8A8A";
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
  ball1X += (speed * dir1X)
  ball1Y += (speed * dir1Y)
}

// Ball 2 movement
function ball2Movement() {
  ball2X += (speed * dir2X)
  ball2Y += (speed * dir2Y)
}

// Ball 1 Collision
function ball1Collision() {
  if (ball1Y - ballRadius < 0) {
    dir1Y = - dir1Y
  } else if (ball1X > canvas.width - paddleSideWidth - 10 - ballRadius) {
    if (ball1Y > paddleSideY && ball1Y < paddleSideY + paddleSideHeight) {
      dir1X = - dir1X
      audioElement.play()
      score += 10
    } 
  } else if (ball1Y > canvas.height - paddleBotHeight- 10 - ballRadius) {
    if (ball1X > paddleBotX && ball1X < paddleBotX + paddleBotWidth) {
      dir1Y = - dir1Y
      audioElement.play()
      score += 10
    } 
  } else if (ball1X - ballRadius < 0) {
    dir1X = - dir1X 
  }
}

// Ball 2 Collision
function ball2Collision() {
  if (ball2X - ballRadius < 0) {
    dir2X = - dir2X
  } else if (ball2Y > canvas.height - paddleBotHeight -10 - ballRadius) {
    if (ball2X > paddleBotX && ball2X < paddleBotX + paddleBotWidth) {
      dir2Y = -dir2Y
      audioElement.play()
      score += 10
    } 
  } else if (ball2X > canvas.width - paddleSideWidth - 10 - ballRadius) {
    if (ball2Y > paddleSideY && ball2Y < paddleSideY + paddleSideHeight) {
      dir2X = - dir2X
      audioElement.play()
      score += 10
    } 
  } else if (ball2Y - ballRadius < 0) {
    dir2Y = - dir2Y
  }
}


// Print Score
function printScore(){
    ctx.font = '18px monospace';
    ctx.fillStyle = "white";
    ctx.fillText('Score: '+ score, 10, 20);
}

// Game Over
function gameOver() {
  if (ball1X >= canvas.width || ball2X >= canvas.width) {
    clearInterval(intervalId)
    alert("GAME OVER!")
  } else if (ball1Y >= canvas.height || ball2Y >= canvas.height) {
    clearInterval(intervalId)
    alert("GAME OVER!")
    
  }
}

// Bounce effect
function preload() {
  bounce = loadSound("bounce_effect.mp3")
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
  gameOver()
}

function initiateGame(speedParam) {
  speed = speedParam
  swap()
  intervalId = setInterval(() => {
    requestAnimationFrame(game)
  }, 20);
}



function swap() {
 
  let elem = document.querySelector("#instructions")
  elem.remove()
  
  canvas = document.createElement("canvas")
  canvas.id = "myCanvas";
  canvas.width = 500;
  canvas.height = 500;
  ctx = canvas.getContext("2d");

  let body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas)

}


document.querySelector("#easy").addEventListener("click", () => initiateGame(3))

document.querySelector("#medium").addEventListener("click", () => initiateGame(5))

document.querySelector("#hard").addEventListener("click", () => initiateGame(7))
