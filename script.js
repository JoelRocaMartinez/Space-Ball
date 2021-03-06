let ctx;
let canvas;

let score = 0;
let point = 0;
let intervalId = 0;

// Save key for local storage of high score
let saveKeyScore = "highscore";

// Variables to create game over elements
let h1;
let div;
let btn;
let body = document.getElementsByTagName("body")[0];

// High Score variable
let highScoreList = undefined;


let isRightArrow = false;
let isLeftArrow = false;
let isUpArrow = false;
let isDownArrow = false;

let speed = 0;


// Direction ball 1
let dir1X = 1
let dir1Y = -1

// Direction ball 2
let dir2X = -1
let dir2Y = 1

// Bounce effect
let audioElement1 = new Audio('bounce_effect.mp3');
let audioElement2 = new Audio('bounce_effect.mp3');
let audioElement3 = new Audio('bounce_effect.mp3');
let audioElement4 = new Audio('bounce_effect.mp3');

audioElement1.volume = 0.2;
audioElement2.volume = 0.2;
audioElement3.volume = 0.2;
audioElement4.volume = 0.2;

// Audio Start
let audioStart = new Audio("audio_start_screen.mp3")

// Game Over effect
let gameOverAudio = new Audio("game_over.mp3")

// Background Video
let video = document.getElementById("myVideo");



// Ball 1 variables
let ball1X = 100;
let ball1Y = 100;

let ballRadius = 10;

// Ball 2 variables
let ball2X = 200;
let ball2Y = 200;

// Paddle Bot variables
let paddleBotX = 0;
let paddleBotWidth = 100;
let paddleBotHeight = 20;

//Paddle Side variables
let paddleSideY = 200;
let paddleSideWidth = 20;
let paddleSideHeight = 0;

// Ball 1
function createBall1() {
  ctx.beginPath();
  ctx.fillStyle = "#fffa94";
  ctx.arc(ball1X, ball1Y, ballRadius, 0, Math.PI*2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};

// Ball 2
function createBall2() {
  ctx.beginPath();
  ctx.fillStyle = "#fffa94";
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

// Event Listeners for Arrows
document.addEventListener('keydown', function(event){
  if (event.key === 'ArrowRight') {
      isRightArrow = true;
      isLeftArrow = false;
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
      audioElement1.play()
      score += point
    } 
  } else if (ball1Y > canvas.height - paddleBotHeight- 10 - ballRadius) {
    if (ball1X > paddleBotX && ball1X < paddleBotX + paddleBotWidth) {
      dir1Y = - dir1Y
      audioElement2.play()
      score += point
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
      audioElement3.play()
      score += point 
    } 
  } else if (ball2X > canvas.width - paddleSideWidth - 10 - ballRadius) {
    if (ball2Y > paddleSideY && ball2Y < paddleSideY + paddleSideHeight) {
      dir2X = - dir2X
      audioElement4.play()
      score += point
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
    let elem2 = document.querySelector("#countDown")
    elem2.remove()
    clearInterval(intervalId);
    gameOverAudio.play();
    audioElement1.muted = !audioElement1.muted
    audioElement2.muted = !audioElement2.muted
    audioElement3.muted = !audioElement3.muted
    audioElement4.muted = !audioElement4.muted
    
    let finish = document.querySelector("#myCanvas");
    finish.remove();
    
    // GAME OVER
    h1 = document.createElement("h1");
    h1.id = "gameOver";
    let itsOver = document.createTextNode("GAME OVER");
    h1.appendChild(itsOver);
    body.appendChild(h1)
    
    // FINAL SCORE
    div = document.createElement("div");
    div.id = "finalScore";
    let finalScore = document.createTextNode("Final Score: " + score);
    div.appendChild(finalScore);
    body.appendChild(div)
    
    // RESTART BUTTON
    btn = document.createElement("button");
    btn.id = "restart";
    let restart = document.createTextNode("Restart");
    btn.appendChild(restart);
    body.appendChild(btn);

    // CHECK HIGH SCORE
    setHighScore();
  
    document.querySelector("#restart").addEventListener("click", () => restartGame())

  } else if (ball1Y >= canvas.height || ball2Y >= canvas.height) {
    let elem2 = document.querySelector("#countDown")
    elem2.remove()
    clearInterval(intervalId);
    gameOverAudio.play();
    audioElement1.muted = !audioElement1.muted
    audioElement2.muted = !audioElement2.muted
    audioElement3.muted = !audioElement3.muted
    audioElement4.muted = !audioElement4.muted
    
    let finish = document.querySelector("#myCanvas");
    finish.remove();
    
    // GAME OVER
    h1 = document.createElement("h1");
    h1.id = "gameOver";
    let itsOver = document.createTextNode("GAME OVER");
    h1.appendChild(itsOver);
    body.appendChild(h1)
    
    // FINAL SCORE
    div = document.createElement("div");
    div.id = "finalScore";
    let finalScore = document.createTextNode("Final Score: " + score);
    div.appendChild(finalScore);
    body.appendChild(div)
    
    // RESTART BUTTON
    btn = document.createElement("button");
    btn.id = "restart";
    let restart = document.createTextNode("Restart");
    btn.appendChild(restart);
    body.appendChild(btn);

     // CHECK HIGH SCORE
     setHighScore();

    document.querySelector("#restart").addEventListener("click", () => restartGame())
    
  }
}




// Set High Score
function getHighScore() {
  let scoreStr = localStorage.getItem(saveKeyScore)
  if (scoreStr == null) {
  highScoreList = undefined;
  } else {
    let highscoreStr = JSON.parse(JSON.stringify(scoreStr))
    highScoreListStr = highscoreStr.split(",")
    highScoreList = highScoreListStr.map(e => Number(e))
  }
}

function setHighScore() {
  // highscore is an array
  if (highScoreList === undefined) { highScoreList = [0,0,0,0,0,0,0,0,0,0] }
  
  if (score > highScoreList[9]) {
    //highScore = score;
    highScoreList.splice(9)
    highScoreList.push(score)
    highScoreList.sort((a,b) => b - a);
    let tempArr = JSON.parse(JSON.stringify(highScoreList))
    localStorage.setItem(saveKeyScore, tempArr);
  }
}

// Resets original values
function reset() {
  //Ball 1 coordenates
  ball1X = 100;
  ball1Y = 100;
  // Ball 2 coordenates
  ball2X = 200;
  ball2Y = 200;
  // Direction ball 1
  dir1X = 1;
  dir1Y = -1;
  // Direction ball 2
  dir2X = -1;
  dir2Y = 1;
  // Score
  score = 0;
  audioElement1.muted = false
  audioElement2.muted = false
  audioElement3.muted = false
  audioElement4.muted = false

  }

// Restarts Game from main page
function restartGame() {
  audioStart.play();
  getHighScore();
  reset();
  div.remove();
  h1.remove();
  btn.remove();
  let start = document.createElement("div")
  start.innerHTML = `<div id="instructions">
  <div class="content">
    <h1><i>Space Pong</i></h1>
  </div>

  <div class="selectMode">
    <h1>Select Difficulty</h1>
  </div>

  <div class="highScores">
    <ol class="hallOfFame">Hall of Fame
    <li class="score">${highScoreList[0]}</li>
    <li class="score">${highScoreList[1]}</li>
    <li class="score">${highScoreList[2]}</li>
    <li class="score">${highScoreList[3]}</li>
    <li class="score">${highScoreList[4]}</li>
    <li class="score">${highScoreList[5]}</li>
    <li class="score">${highScoreList[6]}</li>
    <li class="score">${highScoreList[7]}</li>
    <li class="score">${highScoreList[8]}</li>
    <li class="score">${highScoreList[9]}</li>
    </ol>
  </div>


<div class="svg-wrapper">
  <svg height="75" width="280" xmlns="http://www.w3.org/2000/svg">
    <rect id="shape" height="75" width="280" />
    <div id="text">
      <a id="easy"><span class="spot"></span>EASY</a>
    </div>
  </svg>
</div>

<div class="svg-wrapper">
  <svg height="75" width="280" xmlns="http://www.w3.org/2000/svg">
    <rect id="shape" height="75" width="280" />
    <div id="text">
      <a id="medium"><span class="spot"></span>MEDIUM</a>
    </div>
  </svg>
</div>

<div class="svg-wrapper">
  <svg height="75" width="280" xmlns="http://www.w3.org/2000/svg">
    <rect id="shape" height="75" width="280" />
    <div id="text">
      <a id="hard"><span class="spot"></span>HARD</a>
    </div>
  </svg>
</div>
</div>`



body.appendChild(start);


start.querySelector("#easy").addEventListener("click", () => initiateGame(3, 150, 150, 1, 175, 175))

start.querySelector("#medium").addEventListener("click", () => initiateGame(5, 125, 125, 3, 187.5, 187.5))

start.querySelector("#hard").addEventListener("click", () => initiateGame(7, 100, 100, 5, 200, 200))


}



// Freezes the beggining screen
function freeze() {
  ball1Movement()
  ball2Movement()
  ball1Collision()
  ball2Collision()
}

// Function that Creates the Game
function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  createBall1()
  createBall2()
  createPaddleBot()
  createPaddleSide()
  paddleMovement()
  printScore()
  gameOver()
  setTimeout(freeze, 4000)
}


// Function counted down
function countdown() {
  const startingMinutes = 0.05
  let time = startingMinutes * 60

  let countdownEl = document.createElement("div");
  countdownEl.id = "countDown";
  body.appendChild(countdownEl);

  let intervalId2 = setInterval(updatingCountdown, 1000)

  
// Function Update Countdown
  function updatingCountdown() {
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdownEl.innerHTML = `${seconds}`;
    time--;

    if (seconds <= 0) {
      clearInterval(intervalId2)
      document.getElementById("countDown").textContent = "";
    }
  }
   
}



// Function that Starts the Game
function initiateGame(speedBall, padleBotWidth, padleSideHeight, points, padleBotStart, padleSideStart) {
  countdown();
  reset();
  getHighScore();
  audioStart.pause();
  audioStart.currentTime = 0;
  paddleBotX = padleBotStart
  paddleSideY = padleSideStart
  point = points;
  speed = speedBall;
  paddleBotWidth = padleBotWidth;
  paddleSideHeight = padleSideHeight;
  swap()
  intervalId = setInterval(() => {
    requestAnimationFrame(game)
  }, 20);
}


// Function that Removes the Splash screen and Inserts the Canvas
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





function start(){

  document.querySelector("#easy").addEventListener("click", () => initiateGame(3, 150, 150, 1, 175, 175))

  document.querySelector("#medium").addEventListener("click", () => initiateGame(5, 125, 125, 3, 187.5, 187.5))

  document.querySelector("#hard").addEventListener("click", () => initiateGame(7, 100, 100, 5, 200, 200))

}

let startGame = true;

window.addEventListener('mouseover', () => {
  if(startGame){
    startGame = false;
    audioStart.autoplay = true;
    // audioStart.muted = true;
    audioStart.play();
    audioStart.volume = 0.05;
    audioStart.loop = true;
    start();
  }
})






