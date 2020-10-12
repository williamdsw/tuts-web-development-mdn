
// FIELDS

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let balls = [];
let evilCircle = null;
let ballCount = 0;
let paragraph = null;
const NUMBER_OF_BALLS = 25;

// CLASSES

class Shape {
    constructor(x, y, velocityX, velocityY, exists) {
        this.position = { x, y };
        this.velocity = { x: velocityX, y: velocityY };
        this.exists = exists;
    }
}

/* function Ball (...) */

class Ball extends Shape {

    /* without EC2015 will need */
    /* Shape.call(this, ...)/ */
    /* Ball.prototype = Object.create (Shape.prototype); */
    /* Object.defineProperty (Ball, 'constructor', {...}) */

    constructor(x, y, velocityX, velocityY, exists, color, size) {
        super(x, y, velocityX, velocityY,exists);

        this.color = color;
        this.size = size;
    }

    /* Ball.prototype.draw = function () { ... } */
    draw () {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }
    
    update () {
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
    
    collisionDetect () {
        for (const ball of balls) {
            if (!(this === ball)) {
                if (ball.exists) {
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
        }
    }
}

class EvilCircle extends Shape {
    constructor(x, y, velocityX, velocityY, exists) {
        super(x, y, velocityX, velocityY, exists);

        this.color = 'white';
        this.size = 10;
    }

    draw () {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = 3;
        context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        context.stroke();
    }
    
    checkBounds () {
        if ((this.position.x + this.size) >= width) {
            this.position.x -= this.size;
        }
    
        if ((this.position.x - this.size) <= 0) {
            this.position.x += this.size;
        }
    
        if ((this.position.y + this.size) >= height) {
            this.position.y -= this.size;
        }
    
        if ((this.position.y - this.size) <= 0) {
            this.position.y += this.size;
        }
    }
    
    setControls () {
        let _this = this;
    
        window.addEventListener('keydown', (ev) => {
            if (ev.key !== null) {
                switch(ev.key) {
                    case 'a': { _this.position.x -= _this.velocity.x; break; }
                    case 'd': { _this.position.x += _this.velocity.x; break; }
                    case 'w': { _this.position.y -= _this.velocity.y; break; }
                    case 's': { _this.position.y += _this.velocity.y; break; }
                    default: { break; }
                }
            }
        });
        
    };
    
    collisionDetect () {
        for (const ball of balls) {
            if (ball.exists) {
                const distanceX = (this.position.x - ball.position.x);
                const distanceY = (this.position.y - ball.position.y);
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
                if (distance < (this.size + ball.size)) {
                    ball.exists = false;
                    ballCount--;
    
                    if (paragraph !== null) {
                        paragraph.textContent = `Ball Count: ${ballCount}`;
                    }
                }
            }
        }
    }
}

// FUNCTIONS

window.addEventListener('DOMContentLoaded', () => {

    paragraph = document.querySelector('p');

    evilCircle = new EvilCircle(100, 100, 20, 20, true);
    evilCircle.setControls();

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

        const ball = new Ball(x, y, velocityX, velocityY, true, `rgba(${r}, ${g}, ${b}, ${a})`, size);
        //console.log('ball', ball);
        balls.push(ball);
        ballCount++;
    }

    if (paragraph) {
        paragraph.textContent = `Ball Count: ${ballCount}`;
    }
}

function loop() {
    context.fillStyle = 'rgba(0, 0, 0, 0.25)';
    context.fillRect(0, 0, width, height);

    for (const ball of balls) {
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }

    if (evilCircle !== null) {
        evilCircle.draw();
        evilCircle.checkBounds();
        evilCircle.collisionDetect();
    }

    requestAnimationFrame(loop);
}