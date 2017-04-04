/**
 * Created by Lennart on 27-03-17.
 */

class Ball {

    constructor(x, y, game) {
        this._game = game;

        this._radius = getRandomInt(12, 24);
        //this._color = getRandomColor();
        this._color = '#ffffff';

        this._velocityX = getRandomInt(-7, 7);
        this._velocityY = getRandomInt(1, 6);
        this._coordinateX = x;
        this._coordinateY = y;

        this._gravity = 0.6;
        this._traction = 0.7;
        this._damping = 0.9;
    }


    get coordinateX() {
        return this._coordinateX;
    }

    set coordinateX(value) {
        this._coordinateX = value;
    }

    get coordinateY() {
        return this._coordinateY;
    }

    set coordinateY(value) {
        this._coordinateY = value;
    }

    get velocityX() {
        return this._velocityX;
    }

    set velocityX(value) {
        this._velocityX = value;
    }

    get velocityY() {
        return this._velocityY;
    }

    set velocityY(value) {
        this._velocityY = value;
    }

    stickHit() {
        this.velocityY = -this.velocityY;

        // Don't damp the ball
        //this.velocityY = -this.velocityY * this._damping;
        //this.velocityX *= this._traction;
    }

    checkBounds(canvas) {
        if (this.coordinateX + this._radius >= canvas.width) {
            this.velocityX = -this.velocityX * this._damping;
            this.coordinateX = canvas.width - this._radius;

        } else if (this.coordinateX - this._radius <= 0) {
            this.velocityX = -this.velocityX * this._damping;
            this.coordinateX = this._radius;
        }
        if (this.coordinateY + this._radius >= canvas.height) {
            //this.velocityY = -this.velocityY * this.damping;
            //this.coordinateY = canvas.height - this.radius;
            //this.velocityX *= this.traction;

            // Destroy ball
            this._game.destroyBall(this);


        } else if (this.coordinateY - this._radius <= 0) {
            this.velocityY = -this.velocityY * this._damping;
            this.coordinateY = this._radius;
        }

        this.velocityY += this._gravity;

        this.coordinateX += this.velocityX;
        this.coordinateY += this.velocityY;
    }

    draw(canvas, context) {

        this.checkBounds(canvas);

        context.fillStyle = this._color;
        context.beginPath();
        context.arc(this.coordinateX, this.coordinateY, this._radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();


    }
}