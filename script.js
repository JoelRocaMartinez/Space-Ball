let canvas = document.querySelector("#game")
canvas.style.backgroundColor = "#0d3440"

let ctx = canvas.getContext("2d");



function createBall() {
  ctx.beginPath();
  ctx.fillStyle = "#fffa94"
  ctx.arc(100, 100, 10, 0, Math.PI*2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

function cretePaddle() {

}
