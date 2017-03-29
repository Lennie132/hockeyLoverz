/**
 * Created by Lennart on 29-03-17.
 */

class Game {

    constructor() {
        this._balls = [];
        this._timer = 0;

        this._score = new Score();
    }

    draw(canvas, context) {
        this._balls.forEach(ball => {
            ball.draw(canvas, context);
        });

        if (this._balls.length < 15 && this._timer % 150 === 0) {
            let random = Math.floor(Math.random() * canvas.width - 40);
            this._balls.push(new Ball(random, 100, this));
        }

        this._score.draw(canvas, context);

        this._timer++;
    }

    destroyBall(ball) {
        let index = this._balls.indexOf(ball);
        this._balls.splice(index, 1);
    }

    checkCollision(rect) {
        this._balls.forEach(ball => {
            if (ball.velocityY > 0) {
                let distX = Math.abs(ball.coordinateX - rect.x - rect.width / 2);
                let distY = Math.abs(ball.coordinateY - rect.y - rect.height / 2);

                if (distX <= (rect.width / 2) && distY <= (rect.height / 2)) {
                    ball.stickHit();
                    this._score.addPoint();
                }
            }
        });
    }

}