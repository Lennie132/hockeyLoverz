/**
 * Created by Lennart on 04-04-17.
 */

class Round {

    constructor() {
        this._round = 1;

        this._width = 400;
        this._height = 100;
        this._y = 120;
    }

    get round() {
        return this._round;
    }

    newRound() {
        this._round++;
    }

    checkCollision(canvas, rect, game) {
        if (rect.x < (canvas.width / 2 - this._width / 2) + this._width && (canvas.width / 2 - this._width / 2) < rect.x + rect.width && rect.y < this._y + this._height) {
            game.newRound();
        }
    }

    draw(canvas, context, score) {

        document.getElementById("score_"+this._round).childNodes[3].innerHTML = score.score;

        context.save();
        context.scale(-1,1);
        context.fillStyle = "#e63a74";
        context.fillRect(-canvas.width / 2 - this._width / 2, this._y, this._width, this._height);
        context.font = '20px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('RONDE ' + this._round + ' AFGELOPEN!', -canvas.width / 2, this._y + 35);
        context.fillText('SCORE: ' + score.score + ' PUNTEN', -canvas.width / 2, this._y + 65);

        context.font = '12px Helvetica';
        context.fillText('Houd je stick in dit roze vlak om de volgende ronde te starten', -canvas.width / 2, this._y + 85);

        context.restore();

        context.textAlign="center";

        context.fill();

    }
}