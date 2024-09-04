const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let direction = "";
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
};
let score = 0;
let canChangeDirection = true;

canvas.width = Math.min(window.innerWidth, 400); // Set canvas width based on screen size
canvas.height = canvas.width; // Keep it square

document.addEventListener("keydown", changeDirection);
document.getElementById("upBtn").addEventListener("click", () => changeDirection({ key: "ArrowUp" }));
document.getElementById("downBtn").addEventListener("click", () => changeDirection({ key: "ArrowDown" }));
document.getElementById("leftBtn").addEventListener("click", () => changeDirection({ key: "ArrowLeft" }));
document.getElementById("rightBtn").addEventListener("click", () => changeDirection({ key: "ArrowRight" }));

function changeDirection(event) {
    if (canChangeDirection) {
        if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
        if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        canChangeDirection = false;
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#4CAF50" : "#8BC34A";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "#fff";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "#FF5722";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, box, box);

    canChangeDirection = true;
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Lower the speed by increasing the interval time
let game = setInterval(drawGame, 200);

window.addEventListener("resize", () => {
    canvas.width = Math.min(window.innerWidth, 400); // Adjust canvas width based on screen size
    canvas.height = canvas.width; // Keep it square
});
