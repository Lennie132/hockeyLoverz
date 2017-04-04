/**
 * Created by Lennart on 29-03-17.
 */

class Score {

    constructor() {
        this._score = 0;
        this._total = 0;

        this._width = 400;
        this._height = 60;
        this._y = 20;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    addPoint() {
        this.score++;
    }

    removePoint() {
        this.score--;
    }

    draw(canvas, context) {

        context.fillStyle = "#e63a74";
        context.fillRect(canvas.width/2 - this._width/2, this._y, this._width, this._height);
        context.font = '20px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('SCORE: ' + this.score + ' PUNTEN', canvas.width/2, this._y + 35);
        context.textAlign="center";

        context.fill();

    }
}