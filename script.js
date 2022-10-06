const canvas = document.querySelector('canvas');
canvas.width = canvas.height = 400;
const ctx = canvas.getContext('2d');

const SIZE = 20;

let direction;
let snake;

start();

function draw() {
    ctx.fillStyle = '#212121';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#4A4A4A';
    for (let i = 0; i < canvas.width; i+=SIZE) {
        for (let j = 0; j <canvas.height; j+= SIZE) {
            ctx.strokeRect(i, j, SIZE, SIZE);
        }
    }

    ctx.fillStyle = '#217A2F';
    ctx.strokeStyle = '#1F511C';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, SIZE, SIZE);
        ctx.strokeRect(snake[i].x, snake[i].y, SIZE, SIZE);
    }
}

function move() {
    const { x, y } = snake[0];
    const DIRECTIONS_KEY_CODE = {
        40: {
            x,
            y: y + SIZE,
        },
        37: {
            x: x - SIZE,
            y,
        },
        39: {
            x: x + SIZE,
            y,
        },
        38: {
            x,
            y: y - SIZE,
        },
    };
    const nextMove = DIRECTIONS_KEY_CODE[direction];
    if (!nextMove) return;

    snake.pop();
    snake.unshift(nextMove);
}

function selectDirection(event) {
    direction = event.keyCode;
}

function start() {
    snake = [
        { x: 4 * SIZE, y: 4 * SIZE },
        { x: 3 * SIZE, y: 4 * SIZE },
        { x: 2 * SIZE, y: 4 * SIZE }
    ];
    document.addEventListener('keydown', selectDirection);
    setInterval(draw, 100);
    setInterval(move, 100);
}