const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;
let collision = false;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  ctx.fillStyle = gradient;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 480, 70);
  ctx.fillText(score, 480, 70);
  handleCollisions();
  if (collision) return;

  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}

animate();

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
  bird.frameX = 0;
});

const splat = new Image();
splat.src = "splat.png";

function handleCollisions() {
  obstaclesArray.forEach((obstacle, i) => {
    if (
      bird.x < obstacle.x + obstacle.width &&
      bird.x + bird.width > obstacle.x &&
      ((bird.y < 0 + obstacle.top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstacle.bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      // Collisions detected
      ctx.drawImage(splat, bird.x, bird.y, 50, 50);

      gameOver.classList.remove("hidden");
      points.textContent = `Final Score: ${score}`;

      collision = true;
    }
  });
}

const gameOver = document.querySelector(".game-over");
const reload = document.querySelector(".reload");
const points = document.querySelector("#points");

reload.addEventListener("click", function () {
  document.location.reload();
});
