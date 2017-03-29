/**
 * Created by Lennart on 27-03-17.
 */

class Ball {

    constructor(x, y, game) {
        this._game = game;

        this._radius = 15;

        this._velocityX = 2;
        this._velocityY = 1;
        this._coordinateX = x;
        this._coordinateY = y;

        this._gravity = 0.5;
        this._traction = 0.8;
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

    draw(canvas, context) {

        this.checkBounds(canvas);

        context.beginPath();
        context.fillStyle = "#ffffff";
        context.border = "black solid 3px";
        context.arc(this.coordinateX, this.coordinateY, this._radius, 0, Math.PI * 2, false);
        context.closePath();

        context.fill();

    }
    stickHit() {
        this.velocityY = -this.velocityY * this._damping;
        this.velocityX *= this._traction;
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
}