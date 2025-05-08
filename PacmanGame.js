/* global maze, targetY, targetX */

// PacmanGame.js
const TILE_SIZE = 20;
const WIDTH = 560;
const HEIGHT = 620;
const FPS = 100;

const MAZE = [
  "11111111111111111111",
  "10000000001100000001",
  "10111111101101111101",
  "10100000100001000001",
  "10101111111101111001",
  "10100010000001000001",
  "10111110111101011101",
  "10000000100000000001",
  "11111111111111111111"
];

let canvas, ctx;
let score = 0, lives = 3, level = 1, gameOver = false;
let player;
let ghosts = [];
let dots = [];

class Entity {
  constructor(x, y, color) {
    this.x = this.startX = x;
    this.y = this.startY = y;
    this.color = color;
    this.dx = TILE_SIZE;
    this.dy = 0;
  }

  move(maze) {
    const newX = this.x + this.dx;
    const newY = this.y + this.dy;
    if (!this.collides(newX, newY, maze)) {
      this.x = newX;
      this.y = newY;
    }
  }

  collides(x, y, maze) {
    const col = Math.floor(x / TILE_SIZE);
    const row = Math.floor(y / TILE_SIZE);
    return row < 0 || row >= maze.length || col < 0 || col >= maze[0].length || maze[row][col] === '1';
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.dx = TILE_SIZE;
    this.dy = 0;
  }

  trySetDirection(dx, dy, maze) {
    const newX = this.x + dx;
    const newY = this.y + dy;
    if (!this.collides(newX, newY, maze)) {
      this.dx = dx;
      this.dy = dy;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x + 10, this.y + 10, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Player extends Entity {
  constructor(x, y) {
    super(x, y, 'yellow');
  }
}

class Ghost extends Entity {
  constructor(x, y, color, aiType) {
    super(x, y, color);
    this.aiType = aiType;
  }

  move(AI)(maze, targetX, targetY);
  {if (this.aiType === 'random') {
      if (Math.random() > 0.8) {
        const directions = [[TILE_SIZE, 0], [-TILE_SIZE, 0], [0, TILE_SIZE], [0, -TILE_SIZE]];
        const dir = directions[Math.floor(Math.random() * directions.length)];
        this.trySetDirection(dir[0], dir[1], maze);
      }
    } else if (this.aiType === 'chase') {
      const dx = targetX > this.x ? TILE_SIZE : targetX < this.x ? -TILE_SIZE : 0;
      const dy = targetY > this.y ? TILE_SIZE : targetY < this.y ? -TILE_SIZE : 0;
      if (Math.abs(this.x - targetX) > Math.abs(this.y - targetY)) {
        this.trySetDirection(dx, 0, maze);
      } else {
        this.trySetDirection(0, dy, maze);
      }
    }
    this.move(maze);
  }
}

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.eaten = false;
  }

  draw() {
    if (!this.eaten) {
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(this.x + 10, this.y + 10, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function createDots() {
  dots = [];
  for (let row = 0; row < MAZE.length; row++) {
    for (let col = 0; col < MAZE[row].length; col++) {
      if (MAZE[row][col] === '0') {
        dots.push(new Dot(col * TILE_SIZE, row * TILE_SIZE));
      }
    }
  }
}

function checkDots() {
  let allEaten = true;
  for (let dot of dots) {
    if (!dot.eaten && dot.x === player.x && dot.y === player.y) {
      dot.eaten = true;
      score += 10;
    }
    if (!dot.eaten) allEaten = false;
  }
  if (allEaten) {
    level++;
    score += 100;
    createDots();
    player.reset();
    ghosts.forEach(g => g.reset());
  }
}

function checkCollisions() {
  for (let ghost of ghosts) {
    if (ghost.x === player.x && ghost.y === player.y) {
      lives--;
      if (lives <= 0) gameOver = true;
      else {
        player.reset();
        ghosts.forEach(g => g.reset());
      }
    }
  }
}

function drawMaze() {
  for (let row = 0; row < MAZE.length; row++) {
    for (let col = 0; col < MAZE[row].length; col++) {
      if (MAZE[row][col] === '1') {
        ctx.fillStyle = 'blue';
        ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

function drawHUD() {
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, 10, HEIGHT - 10);
  ctx.fillText(`Lives: ${lives}`, 200, HEIGHT - 10);
  ctx.fillText(`Level: ${level}`, 400, HEIGHT - 10);

  if (gameOver) {
    ctx.fillStyle = 'red';
    ctx.fillText("Game Over - Press R to Restart", 100, HEIGHT / 2);
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawMaze();
  dots.forEach(dot => dot.draw());
  player.move(MAZE);
  ghosts.forEach(g => g.moveAI(MAZE, player.x, player.y));
  player.draw();
  ghosts.forEach(g => g.draw());
  checkDots();
  checkCollisions();
  drawHUD();
}

function keyHandler(e) {
  if (gameOver && e.key.toLowerCase() === 'r') {
    score = 0; lives = 3; level = 1; gameOver = false;
    setupGame();
  } else if (!gameOver) {
    if (e.key === 'ArrowLeft') player.trySetDirection(-TILE_SIZE, 0, MAZE);
    if (e.key === 'ArrowRight') player.trySetDirection(TILE_SIZE, 0, MAZE);
    if (e.key === 'ArrowUp') player.trySetDirection(0, -TILE_SIZE, MAZE);
    if (e.key === 'ArrowDown') player.trySetDirection(0, TILE_SIZE, MAZE);
  }
}

function setupGame() {
  player = new Player(TILE_SIZE, TILE_SIZE);
  ghosts = [
    new Ghost(10 * TILE_SIZE, TILE_SIZE, 'red', 'random'),
    new Ghost(10 * TILE_SIZE, 5 * TILE_SIZE, 'orange', 'chase')
  ];
  createDots();
}

window.onload = function () {
  canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  ctx.font = '16px sans-serif';
  setupGame();
  setInterval(gameLoop, 1000 / FPS);
  window.addEventListener('keydown', keyHandler);
};
