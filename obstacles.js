const obstaclesArray = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3 + 20;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.clientWidth;
    this.width = 20;
    this.color = `hsla(${hue}, 100%, 50%, 0.8)`;
    this.counted = false;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }

  update() {
    this.x -= gameSpeed;
    if (!this.counted && this.x < bird.x) {
      score++;
      this.counted = true;
    }
    this.draw();
  }
}

function handleObstacles() {
  if (frame % 150 === 0) {
    obstaclesArray.unshift(new Obstacle());
  }

  obstaclesArray.forEach((obstacle) => {
    obstacle.update();
  });

  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
}
