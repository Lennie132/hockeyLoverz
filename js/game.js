/**
 * Created by Lennart on 29-03-17.
 */

class Game {

    constructor() {
        this._balls = [];
        this._pause = false;
        this._finished = false;
        this._timer = 600;

        this._score = new Score();
        this._round = new Round();
        this._end = new End();
    }

    get pause() {
        return this._pause;
    }

    get finished() {
        return this._finished;
    }

    newRound() {
        this._round.newRound();
        this._score.total = this._score.total + this._score.score;
        this._score.score = 0;
        this._timer = 600;
        this._balls = [];
        this._pause = false;
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

    draw(canvas, context) {
        if (!this._finished) {
            if (!this._pause) {
                if (this._balls.length < 10 && this._timer % 50 === 0) {
                    this._balls.push(new Ball(getRandomInt(1, canvas.width - 40), 100, this));
                }

                this._balls.forEach(ball => {
                    ball.draw(canvas, context);
                });

                this._score.draw(canvas, context);

                this._timer--;
                if (this._timer === 0) {
                    if (this._round.round === 3) {
                        this._finished = true;
                    } else {
                        this._pause = true;
                    }
                }

            } else {
                this._round.draw(canvas, context, this._score);
            }
        } else {
            this._score.total = this._score.total + this._score.score;
            this._score.score = 0;
            this._end.draw(canvas, context, this._score);
        }
    }

}