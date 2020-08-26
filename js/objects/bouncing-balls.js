
// FIELDS

let context = null;
let width = null;
let height = null;
let balls = [];
const NUMBER_OF_BALLS = 25;

// CLASSES

class Ball {
    constructor(x, y, velocityX, velocityY, color, size) {
        this.position = { x, y };
        this.velocity = { x: velocityX, y: velocityY };
        this.color = color;
        this.size = size;
    }
}

Ball.prototype.draw = function () {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    context.fill();
}

Ball.prototype.update = function() {
    if ((this.position.x + this.size) >= width) {
        this.velocity.x *= - 1;
    }

    if ((this.position.x - this.size) <= 0) {
        this.velocity.x *= -1;
    }

    if ((this.position.y + this.size) >= height) {
        this.velocity.y *= -1;
    }

    if ((this.position.y - this.size) <= 0) {
        this.velocity.y *= -1;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
}

Ball.prototype.collisionDetect = function () {
    for (const ball of balls) {
        if (!(this === ball)) {
            const distanceX = (this.position.x - ball.position.x);
            const distanceY = (this.position.y - ball.position.y);
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < (this.size + ball.size)) {
                const r = random(0, 255);
                const g = random(0, 255);
                const b = random(0, 255);
                const a = random(0.1, 1);
                ball.color = this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
            }
        }
    }
};

// FUNCTIONS

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    generateBalls();
    loop();
});

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBalls () {

    while (balls.length < NUMBER_OF_BALLS) {
        const size = random(10, 20);
        const x = random(0 + size, width - size);
        const y = random(0 + size, height - size);
        const velocityX = random(-7, 7);
        const velocityY = random(-7, 7);
        const r = random(0, 255);
        const g = random(0, 255);
        const b = random(0, 255);
        const a = random(0.1, 1);

        const ball = new Ball(x, y, velocityX, velocityY, `rgba(${r}, ${g}, ${b}, ${a})`, size);
        balls.push(ball);
    }
}

function loop() {
    context.fillStyle = 'rgba(0, 0, 0, 0.25)';
    context.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }

    requestAnimationFrame(loop);
}