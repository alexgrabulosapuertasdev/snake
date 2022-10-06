const canvas = document.querySelector('canvas');
canvas.width = canvas.height = 400;
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');

const MAX_SCORE = 400;
const SIZE = 20;

let apple;
let direction;
let snake;

let intervalDraw;
let intervalMove;

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

    ctx.fillStyle = '#FB1219';
    ctx.fillRect(apple.x, apple.y, SIZE, SIZE);
}

function generateApple() {
    const blocks = snake.map(block => ({ x: block.x, y: block.y }));
    let positionValid;
    let x;
    let y;
    
    do {
        x = Math.floor(Math.random() * canvas.width / SIZE) * SIZE;
        y = Math.floor(Math.random() * canvas.height / SIZE) * SIZE;
        
        positionValid = !blocks.find(block => block.x === x && block.y === y);
    } while(!positionValid);

    apple = { x, y };
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

    snake.unshift(nextMove);

    const blocks = snake.map(block => ({ x: block.x, y: block.y }));
    const touchingApple = blocks.find(block => block.x === apple.x && block.y === apple.y);
    if (touchingApple) {
        upScore();
        generateApple();
        return;
    }
    
    snake.pop();

    const { height, width } = canvas;
    if (x >= width || x < 0 || y >= height || y < 0) {
        start();
    }
}

function resetValues() {
    document.removeEventListener('keydown', selectDirection);
    const { height, width } = canvas;
    apple = {
        x: width / 2,
        y:  height / 2,
    };
    direction = undefined;
    score.innerText = 0;
    snake = [
        { x: 4 * SIZE, y: 4 * SIZE },
        { x: 3 * SIZE, y: 4 * SIZE },
        { x: 2 * SIZE, y: 4 * SIZE }
    ];
    clearInterval(intervalDraw);
    clearInterval(intervalMove);
}

function selectDirection(event) {
    direction = event.keyCode;
}

function start() {
    resetValues();
    document.addEventListener('keydown', selectDirection);
    intervalDraw = setInterval(draw, 100);
    intervalMove = setInterval(move, 100);
}

function upScore() {
    const currentScore = Number(score.innerText) + 1;
    score.innerText = currentScore;
    
    if (currentScore >= MAX_SCORE) {
        win();
    }
}

function win() {
    alert('CONGRATULATIONS! You\'ve won!');
    start();
}